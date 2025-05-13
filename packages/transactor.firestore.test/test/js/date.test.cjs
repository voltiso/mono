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

describe('date', () => {
	it('should convert timestamp to date', async () => {
		expect.hasAssertions()

		const birth = new Date()

		await db('usersOrNot/artur').set({
			age: 20,
			birth,
		})

		const data = await db('usersOrNot/artur').dataWithId()

		expect(data?.['birth']).toBeInstanceOf(Date)

		expect(data).toMatchObject({
			id: 'artur',
			age: 20,
			birth,
		})
	})
})
