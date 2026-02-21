// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import 'zone.js'

import { assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import type { Method } from '@voltiso/transactor'
import { CustomDocPath, Transactor } from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { firestore, firestoreModule } from '../common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	requireSchemas: false,
	onUnknownField: 'error',
	checkDecorators: false,
})

db('nurse/*')
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
	.method('fail', async (path: string) => {
		// const { db } = this
		await db(new CustomDocPath(path)).update({ specialty: 'fireman' })
	})
	.method('good', async function () {
		const { path } = this

		await db(path).update({ specialty: 'fireman' })
	})

describe('raw-private', () => {
	it('should not allow setting private fields', async () => {
		expect.hasAssertions()

		await firestore.doc('nurse/anthony').delete()

		await expect(
			db('nurse', 'anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')
		await expect(db('nurse/anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if privateSchema is provided', async () => {
		expect.hasAssertions()
		await expect(
			db('nurse', 'anthony').set({ illegalField: 123 }),
		).rejects.toThrow('illegalField')
		await expect(db('nurse/anthony')).resolves.toBeNull()
	})

	it('should allow any data for tables without schemas', async () => {
		expect.hasAssertions()

		db.requireSchemas = false
		const doc = await db('mouse').add({ cheese: 123 })
		await db('mouse/ggggg').set({ speaker: 234 })

		await expect(db('mouse', doc.id).data).resolves.toMatchObject({
			cheese: 123,
		})
		await expect(db('mouse', 'ggggg').dataWithId()).resolves.toMatchObject({
			id: 'ggggg',
			speaker: 234,
		})
	})

	it('should not allow any data for tables without schemas if requireSchemas === true', async () => {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(db('mouse').add({ cheese: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(db('mouse/ggggg').set({ speaker: 234 })).rejects.toThrow(
			'missing schema',
		)
	})

	it('should allow private fields access via method', async () => {
		expect.hasAssertions()

		await db('nurse/a').set({})
		await db('nurse/a').methods['setSpecialty']!('magician')
		const doc = await db('nurse/a')

		assert(doc)

		expect(doc.dataWithId()).toMatchObject({
			id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow private fields access via triggers', async () => {
		expect.hasAssertions()

		await db('nurse/a').set({})

		await (db('nurse/a').methods['setSpecialty'] as Method<any>)('master')
		const doc = await db('nurse/a')

		expect(doc?.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying private fields from the same doc', async () => {
		expect.hasAssertions()

		await db('nurse/a').set({})
		await db('nurse/b').set({})

		await expect(
			(db('nurse/a').methods['good'] as Method<any>)(),
		).resolves.toBeUndefined()
	})

	it('should not allow modifying private fields from other documents', async () => {
		expect.hasAssertions()

		await db('nurse/a').set({})
		await db('nurse/b').set({})

		await expect(
			(db('nurse/a').methods['fail'] as Method<any>)('nurse/b'),
		).rejects.toThrow('specialty')
	})
})
