// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { describe, expect, it } = require('@jest/globals')
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})

// eslint-disable-next-line jest/require-hook
let numCalls = 0

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line jest/require-hook
db('account/*').afterDelete(function ({ before }) {
	numCalls++

	// @ts-expect-error ...
	if (before.balance) throw new Error('cannot delete: balance not 0')
})

describe('afterDelete', function () {
	it('should not be called on create or update', async function () {
		expect.hasAssertions()

		await firestore.doc('account/artur').delete()
		await firestore.doc('account/artur').delete()

		numCalls = 0
		await db('account', 'artur').set({ balance: 123 })

		expect(numCalls).toBe(0)

		await db('account/artur').update({ balance: 0 })

		expect(numCalls).toBe(0)
	})

	it('should be called on delete', async function () {
		expect.hasAssertions()

		await firestore.doc('account/artur').delete()
		await firestore.doc('account/artur').delete()
		await db('account/artur').set({ balance: 123 })

		await expect(db('account', 'artur').delete()).rejects.toThrow('balance')

		await db('account/artur').set({ balance: 0 })
		await db('account', 'artur').delete()
	})
})
