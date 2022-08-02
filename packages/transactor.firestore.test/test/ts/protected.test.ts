// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import { createTransactor, Doc, IndexedDoc } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule, {
	requireSchemas: false,
})

class Doctor extends Doc.protected({
	specialty: s.string.optional,
	ofWhat: s.string.optional,
})
	.method('setSpecialty', function (specialty: string) {
		this['specialty'] = specialty
	})
	.afterCreateOrUpdate('set ofWhat', function () {
		if (this.specialty === 'master') this.ofWhat = 'universe'
	})
	.method('ok', async function () {
		await doctors(this.id).update({ specialty: 'fireman' })
	}) {}

const doctors = db('doctorXXX').register(Doctor)
const bazookas = db('bazooka').register(IndexedDoc)

describe('protected', function () {
	it('should not allow setting protected fields', async function () {
		expect.hasAssertions()

		await firestore.doc('doctorXXX/anthony').delete()

		await expect(
			// @ts-expect-error `specialty` is protected
			doctors('anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')
		await expect(doctors('anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if protectedSchema is provided', async function () {
		expect.hasAssertions()
		// @ts-expect-error
		await expect(doctors('anthony').set({ illegalField: 123 })).rejects.toThrow(
			'illegalField',
		)
		await expect(doctors('anthony')).resolves.toBeNull()
	})

	it('should allow any data for tables without schemas', async function () {
		expect.hasAssertions()

		db.requireSchemas = false
		const doc = await bazookas.add({ items: 123 })
		await bazookas('ggggg').set({ beds: 234 })

		await expect(bazookas(doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			items: 123,
		})
		expect((await bazookas('ggggg'))?.data).toMatchObject({ beds: 234 })
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(bazookas.add({ items: 123 })).rejects.toThrow('missing schema')
		await expect(bazookas('ggggg').set({ beds: 234 })).rejects.toThrow(
			'missing schema',
		)

		db.requireSchemas = false
	})

	it('should allow protected fields access via methods', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').methods.setSpecialty('magician')
		const doc = await doctors('a')

		expect(doc?.dataWithId()).toMatchObject({
			id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow protected fields access via triggers', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a')['setSpecialty']('master')
		const doc = await doctors('a')

		expect(doc?.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying protected fields from other documents', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').ok()

		await expect(doctors('a').specialty).resolves.toBe('fireman')
	})
})
