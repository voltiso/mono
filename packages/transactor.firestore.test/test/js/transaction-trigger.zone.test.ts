// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { incrementIt } from '@voltiso/util'
import { describe, expect, it } from 'vitest'
import { firestore, srcFirestore } from './common/index.cjs'

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})

db('userA/{user}/project/*').after(
	async ({ db, before, after, pathParams }) => {
		// @ts-expect-error ...
		const dNumProjects = Boolean(after) - Boolean(before)

		if (dNumProjects) {
			// @ts-expect-error ...
			await db('userA', pathParams.user).update({
				numProjects: incrementIt(dNumProjects),
			})
		}
	},
)

db('userA/{user}').after(async ({ after }) => {
	// @ts-expect-error ...
	if (after?.numProjects > 2) {
		throw new Error('userA can have max 2 projects')
	}
})

describe('transaction-trigger', () => {
	it('should process triggers', async () => {
		expect.hasAssertions()

		await firestore.doc('userA/artur/project/tds').delete()
		await firestore.doc('userA/artur').set({ age: 20, numProjects: 0 })

		await db.runTransaction(async db => {
			await db('userA/artur/project/tds').set({ name: 'TDS' })

			await expect(db('userA/artur').data['numProjects']).resolves.toBe(1)
		})

		const doc = await db('userA/artur')

		expect(doc?.dataWithId()).toMatchObject({
			id: 'artur',
			age: 20,
			numProjects: 1,
		})
	})

	it('transaction should be created if needed by trigger', async () => {
		expect.hasAssertions()

		await firestore.doc('userA/artur/project/tds').delete()
		await firestore.doc('userA/artur/project/wrs').delete()
		await firestore.doc('userA/artur/project/fph').delete()
		await firestore.doc('userA/artur').delete()

		await expect(
			db('userA/artur/project/tds').set({ name: 'TDS' }),
		).rejects.toThrow('NOT_FOUND')

		await firestore.doc('userA/artur').set({ age: 20, numProjects: 0 })

		await db('userA/artur/project/tds').set({ name: 'TDS' })
		await db('userA/artur/project/wrs').set({ name: 'WRS' })

		await expect(
			db('userA/artur/project/fph').set({ name: 'FPH' }),
		).rejects.toThrow('userA can have max 2 projects')

		await expect(db('userA/artur/project/fph')).resolves.toBeNull()
		await expect(db('userA/artur').dataWithId()).resolves.toMatchObject({
			id: 'artur',
			age: 20,
			numProjects: 2,
		})
	})
})
