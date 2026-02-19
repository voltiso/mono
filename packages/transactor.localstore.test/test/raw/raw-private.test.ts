// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { Method } from '@voltiso/transactor'
import { CustomDocPath } from '@voltiso/transactor'

import { createTransactor, database } from '../common'

const db = createTransactor({
	requireSchemas: false,
	onUnknownField: 'error',
	checkDecorators: false,
})

// eslint-disable-next-line jest/require-hook
db('cosmos/*')
	.private({
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	})
	.method('setSpecialty', function (specialty: string) {
		this.data['specialty'] = specialty
	})
	.afterCreateOrUpdate(function () {
		if (this.data['specialty'] === 'master') this.data['ofWhat'] = 'universe'
	})
	.method('fail', async function (path: string) {
		// const { db } = this

		await db(new CustomDocPath(path)).update({ specialty: 'fireman' })
	})
	.method('good', async function () {
		const { path } = this

		await db(path).update({ specialty: 'fireman' })
	})

describe('raw-private', function () {
	it('should not allow setting private fields', async function () {
		expect.hasAssertions()

		await database.doc('cosmos/anthony').delete()

		await expect(
			db('cosmos', 'anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')
		await expect(db('cosmos/anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if privateSchema is provided', async function () {
		expect.hasAssertions()
		await expect(
			db('cosmos', 'anthony').set({ illegalField: 123 }),
		).rejects.toThrow('illegalField')
		await expect(db('cosmos/anthony')).resolves.toBeNull()
	})

	it('should allow any data for tables without schemas', async function () {
		expect.hasAssertions()

		db.requireSchemas = false
		const doc = await db('jaw').add({ hair: 123 })
		await db('jaw/ggggg').set({ jaws: 234 })

		await expect(db('jaw', doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			hair: 123,
		})
		await expect(db('jaw', 'ggggg').dataWithId()).resolves.toMatchObject({
			id: 'ggggg',
			jaws: 234,
		})
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(db('jaw').add({ hair: 123 })).rejects.toThrow('missing schema')
		await expect(db('jaw/ggggg').set({ jaws: 234 })).rejects.toThrow(
			'missing schema',
		)
	})

	it('should allow private fields access via method', async function () {
		expect.hasAssertions()

		await db('cosmos/a').set({})
		await db('cosmos/a').methods['setSpecialty']!('magician')
		const doc = await db('cosmos/a')

		expect(doc!.data).toMatchObject({
			// id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow private fields access via triggers', async function () {
		expect.hasAssertions()

		await db('cosmos/a').set({})

		await (db('cosmos/a').methods['setSpecialty'] as Method<any>)('master')
		const doc = await db('cosmos/a')

		expect(doc?.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying private fields from the same doc', async function () {
		expect.hasAssertions()

		await db('cosmos/a').set({})
		await db('cosmos/b').set({})

		const result = await db('cosmos/a').methods['good']!()

		expect(result).toBeUndefined()
	})

	it('should not allow modifying private fields from other documents', async function () {
		expect.hasAssertions()

		await db('cosmos/a').set({})
		await db('cosmos/b').set({})

		await expect(
			(db('cosmos/a').methods['fail'] as Method<any>)('cosmos/b'),
		).rejects.toThrow('specialty')
	})
})
