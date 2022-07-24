const { incrementIt } = require('../../src')
const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

const db = createTransactor(firestore, { requireSchemas: false })

// eslint-disable-next-line jest/require-hook
db('userA/{user}/project/*').after(async ({ db, before, after, pathParams }) => {
	// @ts-expect-error
	const dNumProjects = !!after - !!before

	if (dNumProjects) {
		// @ts-expect-error
		await db('userA', pathParams.user).update({
			numProjects: incrementIt(dNumProjects),
		})
	}
})

// eslint-disable-next-line jest/require-hook
db('userA/{user}').after(async ({ after }) => {
	// @ts-expect-error
	if (after?.numProjects > 2) {
		throw new Error('userA can have max 2 projects')
	}
})

describe('transaction-trigger', () => {
	it('should process triggers', async function () {
		expect.hasAssertions()
		await firestore.doc('userA/artur/project/tds').delete()
		await firestore.doc('userA/artur').set({ age: 20, numProjects: 0 })

		await db.runTransaction(async db => {
			await db('userA/artur/project/tds').set({ name: 'TDS' })
			// @ts-ignore
			await expect(db('userA/artur')['numProjects']).resolves.toBe(1)
		})

		const doc = await db('userA/artur')
		expect(doc?.dataWithId()).toMatchObject({ id: 'artur', age: 20, numProjects: 1 })
	})

	it('transaction should be created if needed by trigger', async () => {
		expect.hasAssertions()
		await firestore.doc('userA/artur/project/tds').delete()
		await firestore.doc('userA/artur/project/wrs').delete()
		await firestore.doc('userA/artur/project/fph').delete()
		await firestore.doc('userA/artur').delete()

		await expect(db('userA/artur/project/tds').set({ name: 'TDS' })).rejects.toThrow('NOT_FOUND')

		await firestore.doc('userA/artur').set({ age: 20, numProjects: 0 })

		await db('userA/artur/project/tds').set({ name: 'TDS' })
		await db('userA/artur/project/wrs').set({ name: 'WRS' })
		await expect(db('userA/artur/project/fph').set({ name: 'FPH' })).rejects.toThrow('userA can have max 2 projects')

		await expect(db('userA/artur/project/fph')).resolves.toBeNull()
		await expect(db('userA/artur').dataWithId()).resolves.toMatchObject({ id: 'artur', age: 20, numProjects: 2 })
	})
})
