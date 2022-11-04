// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

describe('update', function () {
	it('should update nested field', async function () {
		expect.hasAssertions()

		const id = 'artur'

		await db('person/artur').set({
			age: 20,

			gameRatings: {
				baloniki: 8,
				vscode: 3,
			},
		})

		await db('person', id).update({
			gameRatings: {
				vscode: 10,
			},
		})

		const expected = {
			age: 20,

			gameRatings: {
				baloniki: 8,
				vscode: 10,
			},
		}

		await expect(db('person', 'artur').dataWithoutId()).resolves.toMatchObject(
			expected,
		)
		await expect(db('person', 'artur').dataWithId()).resolves.toMatchObject({
			...expected,
			id,
		})

		const doc = await db('person', 'artur')

		expect(doc?.dataWithoutId()).toMatchObject(expected)
		expect(doc?.dataWithId()).toMatchObject({ ...expected, id })
	})

	it('should create objects if needed', async function () {
		expect.hasAssertions()

		await db('a/a').set({ x: 1 })
		await db('a/a').update({ y: { yy: 2 } })


		await expect(db('a/a').dataWithId()).resolves.toMatchObject({
			id: 'a',
			x: 1,
			y: { yy: 2 },
		})
		// @ts-expect-error ...
		await expect(db('a/a').x).resolves.toBe(1)

		// @ts-expect-error ...
		await expect(db('a/a').y.yy).resolves.toBe(2)
	})

	it('should throw if document does not exist', async function () {
		expect.hasAssertions()

		await db('a/aa').delete()

		await expect(db('a/aa').update({ a: 1 })).rejects.toThrow('NOT_FOUND')
	})
})
