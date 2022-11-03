// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { sVoltisoEntry, Transactor } from '@voltiso/transactor'
import { incrementIt } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	requireSchemas: false,
	refCounters: false,
})

describe('incrementIt', function () {
	it('works', async function () {
		expect.hasAssertions()

		await firestore.doc('userB/artur').set({ age: 20 })
		await db('userB/artur').update({ age: incrementIt(1) })

		await expect(db('userB/artur').data['age']).resolves.toBe(21)
	})

	it('works with chained updates within transaction', async function () {
		expect.hasAssertions()

		await firestore.doc('userB/artur').set({ age: 20 })
		await db.runTransaction(async db => {
			await db('userB/artur').update({ age: incrementIt(1) })
			await db('userB/artur').update({ age: incrementIt(10) })
		})

		await expect(db('userB/artur').data['age']).resolves.toBe(31)
	})

	it('passes-through updates to firestore (no throw on undefined += x)', async function () {
		expect.hasAssertions()

		await firestore.doc('userB/artur').set({ age: 20 })
		await db('userB/artur/project/tds').set({})

		await expect(
			db('userB/artur/project/super').update({ numProjects: incrementIt(1) }),
		).rejects.toThrow('NOT_FOUND') // no such document

		await db('userB/artur/project/tds').update({ numProjects: incrementIt(1) }) // this work unfortunately - FireStore allows this

		await expect(
			db('userB/artur/project/tds').dataWithId(),
		).resolves.toStrictEqual({
			__voltiso: sVoltisoEntry.validate(undefined),
			id: 'tds',
			numProjects: 1,
		})
	})

	it('passes-through updates to firestore (no throw on undefined += x) - in transaction', async function () {
		expect.hasAssertions()

		await firestore.doc('userB/artur').set({ age: 20 })
		await db('userB/artur/project/tds').set({})
		await db.runTransaction(async db => {
			await db('userB/artur/project/tds').update({
				numProjects: incrementIt(1),
			})
		})

		await expect(db('userB/artur/project/tds').data).resolves.toStrictEqual({
			__voltiso: sVoltisoEntry.validate(undefined),
			numProjects: 1,
		})
	})
})
