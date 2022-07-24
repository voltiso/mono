const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

const db = createTransactor(firestore, { requireSchemas: false })

// eslint-disable-next-line jest/require-hook
let numCalls = 0

// eslint-disable-next-line jest/require-hook
db('computer/*').beforeCommit(function () {
	numCalls++
	// @ts-ignore
	if (this && this.balance === 0) throw new Error('balance cannot be 0')
})

describe('beforeCommit', function () {
	it('should process beforeCommit', async function () {
		expect.hasAssertions()
		numCalls = 0
		await db('computer', 'artur').delete()
		expect(numCalls).toBe(1)

		await expect(db('computer', 'artur').set({ balance: 0 })).rejects.toThrow('balance')

		await db.runTransaction(async db => {
			await db('computer', 'artur').set({ balance: 0 })
			await db('computer', 'artur').set({ balance: 123 })
		})

		const artur = await db('computer/artur')
		// @ts-ignore
		expect(artur.balance).toBe(123)
	})
})
