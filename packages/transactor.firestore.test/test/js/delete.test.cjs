// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { describe, expect, it } = require('@jest/globals')
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})

describe('delete', () => {
	it('should delete document', async () => {
		expect.hasAssertions()

		await db('users', 'artur').set({ age: 20 })
		await db('users', 'artur').delete()

		const doc = await db('users', 'artur')

		expect(doc).toBeNull()
	})
})
