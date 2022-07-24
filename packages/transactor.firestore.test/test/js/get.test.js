const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

const db = createTransactor(firestore, { requireSchemas: false })

describe('get', function () {
	it('should return null if document does not exist', async function () {
		expect.hasAssertions()
		await firestore.doc('usersAB/artur').delete()
		const doc = await db('usersAB', 'artur')
		expect(doc).toBeNull()
	})

	it('should return document with id', async function () {
		expect.hasAssertions()
		await db('usersAB', 'artur').set({ name: 'Arturo' })
		const data = await db('usersAB', 'artur').dataWithId()
		expect(data).toMatchObject({ id: 'artur', name: 'Arturo' })
	})
})
