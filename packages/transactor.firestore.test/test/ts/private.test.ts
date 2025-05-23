// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { Doc, Transactor } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	onUnknownField: 'error',
	checkDecorators: false,
})

class Doctor extends Doc.with({
	id: s.string,

	private: {
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	},
})
	.method('setSpecialty', function (specialty: string) {
		this.data.specialty = specialty
	})
	.afterCreateOrUpdate('set ofWhat', function () {
		if (this.data.specialty === 'master') this.data.ofWhat = 'universe'
	})
	.method('good', async function () {
		// ! type-check fails here because of no public fields
		// // @ts-expect-error setting private field???
		await doctors(this.id as string).update({ specialty: 'fireman' })
	}) {}

const doctors = db('human').register(Doctor)
const cats = db('cat')

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
		await doctors('a').methods.setSpecialty('magician')
		const doc = await doctors('a')

		expect(doc?.data).toMatchObject({
			// id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow private fields access via triggers', async function () {
		expect.hasAssertions()

		await doctors('a').set({})
		await doctors('a').methods.setSpecialty('master')
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

		await expect(da.methods.good()).resolves.toBeUndefined()
	})
})
