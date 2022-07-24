// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { Doc } from '@voltiso/transactor'

import { createTransactor, database } from '../common'

const db = createTransactor({ requireSchemas: false })

// eslint-disable-next-line jest/require-hook
db('doctor/*')
	.protected({
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	})
	.method('setSpecialty', function (specialty: string) {
		this['specialty'] = specialty
	})
	.afterCreateOrUpdate(function () {
		// @ts-expect-error hmm
		if (this.specialty === 'master') this.ofWhat = 'universe'
	})
	.method('ok', async function (this: Doc) {
		const { path } = this
		await db(path).update({ specialty: 'fireman' })
	})

describe('raw-protected', function () {
	it('should not allow setting protected fields', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

		await expect(
			db('doctor', 'anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')

		await expect(db('doctor/anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if protectedSchema is provided', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

		await expect(
			db('doctor', 'anthony').set({ illegalField: 123 }),
		).rejects.toThrow('illegalField')

		await expect(db('doctor/anthony')).resolves.toBeNull()
	})

	it('should allow any data for tables without schemas', async function () {
		expect.hasAssertions()

		db.requireSchemas = false
		const doc = await db('war').add({ warField: 123 })
		await db('war/ggggg').set({ xField: 234 })

		await expect(db('war', doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			warField: 123,
		})
		expect((await db('war', 'ggggg'))!.data).toMatchObject({ xField: 234 })
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(db('war').add({ warField: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(db('war/ggggg').set({ xField: 234 })).rejects.toThrow(
			'missing schema',
		)

		db.requireSchemas = false
	})

	it('should allow protected fields access via actions', async function () {
		expect.hasAssertions()

		await db('doctor/a').set({})
		await db('doctor/a').methods['setSpecialty']!('magician')
		const doc = await db('doctor/a')
		assert(doc)

		expect(doc.data).toMatchObject({
			// id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow protected fields access via triggers', async function () {
		expect.hasAssertions()

		await db('doctor/a').set({})

		// @ts-expect-error ...
		await db('doctor/a')['setSpecialty']('master')
		const doc = await db('doctor/a')

		expect(doc!.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying protected fields from other documents', async function () {
		expect.hasAssertions()

		await db('doctor/a').set({})
		await db('doctor/a').methods['ok']!()

		await expect(db('doctor/a')['specialty']).resolves.toBe('fireman')
	})
})
