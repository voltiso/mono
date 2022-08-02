// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

/* eslint-disable jest/require-hook */
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

let counter = 0
// @ts-expect-error ...
db('mother/{user}').afterCreateOrUpdate(function () {
	this['age'] = 9393
	++counter
})

describe('afterCreateOrUpdate', function () {
	it('should modify fields', async function () {
		expect.hasAssertions()

		await db('mother', 'artur').delete()
		await db('mother', 'artur').set({ age: 20 })
		const doc = await db('mother', 'artur')

		// @ts-expect-error ...
		expect(doc.data).toMatchObject({
			// id: 'artur',
			age: 9393,
		})
	})

	it('should not be called on delete', async function () {
		expect.hasAssertions()

		counter = 0
		await db('mother', 'artur').delete()

		expect(counter).toBe(0)

		await db('mother', 'artur').set({ age: 999 })

		expect(counter).toBe(2) // called twice, because the trigger modifies field and is then called again

		await db('mother', 'artur').delete()

		expect(counter).toBe(2)
	})
})
