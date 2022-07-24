// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { firestore, srcFirestore } = require('./common/index.cjs')
const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

describe('delete', function () {
	it('should delete document', async function () {
		expect.hasAssertions()

		await db('users', 'artur').set({ age: 20 })
		await db('users', 'artur').delete()

		const doc = await db('users', 'artur')

		expect(doc).toBeNull()
	})
})
