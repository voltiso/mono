// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Method } from '@voltiso/transactor'
import { createTransactor, DocPath } from '@voltiso/transactor'

import { firestore, firestoreModule } from '../common/firestore.js'

const db = createTransactor(firestore, firestoreModule, {
	requireSchemas: false,
})

// eslint-disable-next-line jest/require-hook
db('nurse/*')
	.private({
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	})
	.method('setSpecialty', function (specialty: string) {
		this['specialty'] = specialty
	})
	.afterCreateOrUpdate(function () {
		if (this['specialty'] === 'master') this['ofWhat'] = 'universe'
	})
	.method('fail', async function (path: string) {
		// const { db } = this
		// eslint-disable-next-line @typescript-eslint/no-unsafe-call
		await db(new DocPath(path)).update({ specialty: 'fireman' })
	})
	.method('good', async function () {
		const { path } = this

		await db(path).update({ specialty: 'fireman' })
	})

describe('raw-private', function () {
	it('should not allow setting private fields', async function () {
		expect.hasAssertions()

		await firestore.doc('nurse/anthony').delete()

		await expect(
			db('nurse', 'anthony').set({ specialty: 'neurosurgery' }),
		).rejects.toThrow('specialty')
		await expect(db('nurse/anthony')).resolves.toBeNull()
	})

	it('should assume empty schema if privateSchema is provided', async function () {
		expect.hasAssertions()
		await expect(
			db('nurse', 'anthony').set({ illegalField: 123 }),
		).rejects.toThrow('illegalField')
		await expect(db('nurse/anthony')).resolves.toBeNull()
	})

	it('should allow any data for tables without schemas', async function () {
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

	it('should not allow any data for tables without schemas if requireSchemas === true', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(db('mouse').add({ cheese: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(db('mouse/ggggg').set({ speaker: 234 })).rejects.toThrow(
			'missing schema',
		)
	})

	it('should allow private fields access via method', async function () {
		expect.hasAssertions()

		await db('nurse/a').set({})
		await db('nurse/a').methods['setSpecialty']!('magician')
		const doc = await db('nurse/a')

		expect(doc.dataWithId()).toMatchObject({
			id: 'a',
			specialty: 'magician',
		})
	})

	it('should allow private fields access via triggers', async function () {
		expect.hasAssertions()

		await db('nurse/a').set({})

		await (db('nurse/a')['setSpecialty'] as Method<any>)('master')
		const doc = await db('nurse/a')

		expect(doc?.dataWithoutId()).toMatchObject({
			specialty: 'master',
			ofWhat: 'universe',
		})
	})

	it('should allow modifying private fields from the same doc', async function () {
		expect.hasAssertions()

		await db('nurse/a').set({})
		await db('nurse/b').set({})

		await expect(
			(db('nurse/a')['good'] as Method<any>)(),
		).resolves.toBeUndefined()
	})

	it('should not allow modifying private fields from other documents', async function () {
		expect.hasAssertions()

		await db('nurse/a').set({})
		await db('nurse/b').set({})

		await expect(
			(db('nurse/a')['fail'] as Method<any>)('nurse/b'),
		).rejects.toThrow('specialty')
	})
})
