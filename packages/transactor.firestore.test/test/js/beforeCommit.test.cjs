// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { describe, expect, it } = require('@jest/globals')
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

// eslint-disable-next-line jest/require-hook
let numCalls = 0

// eslint-disable-next-line jest/require-hook
db('computer/*').beforeCommit(function () {
	numCalls++

	// @ts-expect-error ...
	if (this && this.balance === 0) throw new Error('balance cannot be 0')
})

describe('beforeCommit', function () {
	it('should process beforeCommit', async function () {
		expect.hasAssertions()

		numCalls = 0
		await db('computer', 'artur').delete()

		expect(numCalls).toBe(1)

		await expect(db('computer', 'artur').set({ balance: 0 })).rejects.toThrow(
			'balance',
		)

		await db.runTransaction(async db => {
			await db('computer', 'artur').set({ balance: 0 })
			await db('computer', 'artur').set({ balance: 123 })
		})

		const artur = await db('computer/artur')

		// @ts-expect-error ...
		expect(artur.balance).toBe(123)
	})
})
