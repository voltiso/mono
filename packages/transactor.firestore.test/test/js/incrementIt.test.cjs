// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

import { incrementIt, omit } from '@voltiso/util'

const { sVoltisoEntry } = require('@voltiso/transactor')
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	refCounters: false,
})

describe('incrementIt', function () {
	it('works', async function () {
		expect.hasAssertions()

		await firestore.doc('friend/artur').set({ age: 20 })
		await db('friend/artur').update({ age: incrementIt(1) })

		await expect(db('friend/artur').data['age']).resolves.toBe(21)
	})

	it('works with chained updates within transaction', async function () {
		expect.hasAssertions()

		await firestore.doc('friend/artur').set({ age: 20 })
		await db.runTransaction(async db => {
			await db('friend/artur').update({ age: incrementIt(1) })
			await db('friend/artur').update({ age: incrementIt(10) })
		})

		await expect(db('friend/artur').data['age']).resolves.toBe(31)
	})

	it('passes-through updates to firestore (no throw on undefined += x)', async function () {
		expect.hasAssertions()

		await firestore.doc('friend/artur').set({ age: 20 })
		await db('friend/artur/project/tds').set({})

		await expect(
			db('friend/artur/project/super').update({ numProjects: incrementIt(1) }),
		).rejects.toThrow('NOT_FOUND') // no such document

		await db('friend/artur/project/tds').update({ numProjects: incrementIt(1) }) // this work unfortunately - FireStore allows this

		await expect(
			db('friend/artur/project/tds').dataWithId(),
		).resolves.toMatchObject({
			__voltiso: omit(
				sVoltisoEntry.validate(undefined),
				'createdAt',
				'updatedAt',
			),

			id: 'tds',
			numProjects: 1,
		})
	})

	it('passes-through updates to firestore (no throw on undefined += x) - in transaction', async function () {
		expect.hasAssertions()

		await firestore.doc('friend/artur').set({ age: 20 })
		await db('friend/artur/project/tds').set({})
		await db.runTransaction(async db => {
			await db('friend/artur/project/tds').update({
				numProjects: incrementIt(1),
			})
		})

		await expect(db('friend/artur/project/tds').data).resolves.toMatchObject({
			__voltiso: omit(
				sVoltisoEntry.validate(undefined),
				'createdAt',
				'updatedAt',
			),

			numProjects: 1,
		})
	})
})
