// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import { Doc, IndexedDoc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor({ requireSchemas: false })

class Doctor extends Doc({
	protected: {
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	},
})
	.method('setSpecialty', function (specialty: string) {
		this['specialty'] = specialty
	})
	.afterCreateOrUpdate('set ofWhat', function () {
		if (this.specialty === 'master') this.ofWhat = 'universe'
	})
	.method('ok', async function () {
		const docRef = doctors(this.id)
		await docRef.update({ specialty: 'fireman' })
	}) {}

const doctors = db('doctor').register(Doctor)
const countries = db('country').register(IndexedDoc)

describe('protected', function () {
	it('should not allow setting protected fields', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

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
		const doc = await countries.add({ field8: 123 })
		await countries('ggggg').set({ address: 234 })

		await expect(countries(doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			field8: 123,
		})
		expect((await countries('ggggg'))?.data).toMatchObject({ address: 234 })
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(countries.add({ field8: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(countries('ggggg').set({ address: 234 })).rejects.toThrow(
			'missing schema',
		)

		db.requireSchemas = false
	})

	it('should allow protected fields access via methods', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').methods.setSpecialty('magician')
		const doc = await doctors('a')

		expect(doc?.data).toMatchObject({
			// id: 'a',
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
