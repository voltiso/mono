const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

const db = createTransactor(firestore, { requireSchemas: false })

describe('delete', function () {
	it('should delete document', async function () {
		expect.hasAssertions()
		await db('users', 'artur').set({ age: 20 })
		await db('users', 'artur').delete()

		const doc = await db('users', 'artur')
		expect(doc).toBeNull()
	})
})
