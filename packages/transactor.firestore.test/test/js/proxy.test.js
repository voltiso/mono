const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

const db = createTransactor(firestore, { requireSchemas: false })

describe('proxy', function () {
	it('should throw on immutable result change', async function () {
		expect.hasAssertions()
		const user = await db('user/adam').set({ age: 123 })
		expect(() => {
			// @ts-ignore
			user.age = 234
		}).toThrow('immutable')
	})

	it('should throw on immutable result change (nested)', async function () {
		expect.hasAssertions()
		const adam = await db('user/adam').set({ address: { street: 'a' } })
		expect(() => {
			// @ts-ignore
			adam.address.street = 'b'
		}).toThrow('immutable')
	})
})
