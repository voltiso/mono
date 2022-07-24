// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import { createTransactor, Doc, IndexedDoc } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore.js'

const db = createTransactor(firestore, firestoreModule)

class Doctor extends Doc.private({
	specialty: s.string.optional,
	ofWhat: s.string.optional,
})
	.method('setSpecialty', function (specialty: string) {
		this.specialty = specialty
	})
	.afterCreateOrUpdate('set ofWhat', function () {
		if (this.specialty === 'master') this.ofWhat = 'universe'
	})
	.method('good', async function () {
		// @ts-expect-error setting private field???
		await doctors(this.id as string).update({ specialty: 'fireman' })
	}) {}

const doctors = db('human').register(Doctor)
const cats = db('cat').register(IndexedDoc)

describe('private', function () {
	it('should not allow setting private fields', async function () {
		expect.hasAssertions()

		await firestore.doc('human/anthony').delete()

		await expect(
			// @ts-expect-error `specialty` is private
			doctors('anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')
		await expect(doctors('anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if privateSchema is provided', async function () {
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
		const doc = await cats.add({ milk: 123 })
		await cats('ggggg').set({ milkman: 234 })

		await expect(cats(doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			milk: 123,
		})
		await expect(cats('ggggg').dataWithId()).resolves.toMatchObject({
			id: 'ggggg',
			milkman: 234,
		})
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(cats.add({ milk: 123 })).rejects.toThrow('missing schema')
		await expect(cats('ggggg').set({ milkman: 234 })).rejects.toThrow(
			'missing schema',
		)
	})

	it('should allow private fields access via method', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').setSpecialty('magician')
		const doc = await doctors('a')

		expect(doc?.data).toMatchObject({
			// id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow private fields access via triggers', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').setSpecialty('master')
		const doc = await doctors('a')

		expect(doc?.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying private fields from the same doc', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		const da = doctors('a')

		await expect(da.good()).resolves.toBeUndefined()
	})
})
