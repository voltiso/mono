const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

const db = createTransactor(firestore, { requireSchemas: false })

describe('date', function () {
	it('should convert timestamp to date', async function () {
		expect.hasAssertions()
		const birth = new Date()

		await db('usersOrNot/artur').set({
			age: 20,
			birth,
		})

		await expect(db('usersOrNot/artur').dataWithId()).resolves.toMatchObject({
			id: 'artur',
			age: 20,
			birth,
		})
	})
})
