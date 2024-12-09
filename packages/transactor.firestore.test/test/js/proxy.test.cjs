// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { describe, expect, it } = require('@jest/globals')
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})

describe('proxy', function () {
	it('should throw on immutable result change', async function () {
		expect.hasAssertions()

		const user = await db('user/adam').set({ age: 123 })

		expect(() => {
			// @ts-expect-error ...
			user.age = 234
		}).toThrow(`trap returned falsish for property 'age'`)
	})

	it('should throw on immutable result change (nested)', async function () {
		expect.hasAssertions()

		const adam = await db('user/adam').set({ address: { street: 'a' } })

		expect(() => {
			// @ts-expect-error ...
			adam.address.street = 'b'
		}).toThrow(`assign to read only property 'street'`)
	})
})
