'use strict'

const { firestore, srcFirestore } = require('./common/index.cjs')
const { createTransactor } = srcFirestore

const db = createTransactor(firestore, { requireSchemas: false })

if (
	function () {
		// @ts-ignore
		return this
	}.call(null) !== null
)
	throw new Error('[@voltiso/transactor] unable to call function with `this === null`')

// eslint-disable-next-line jest/require-hook
db('frog/{user}')
	.beforeCommit(function () {
		if (!this) return
		if ((this['age'] || 0) < 18) throw new Error('frog too young')
	})

	.after(async ({ after, path, pathParams, id }) => {
		if (after) {
			return {
				...after,
				isAdmin: false,
				pathParams,
				path: path.toString(),
				argId: id,
			}
		} else return undefined
	})

	.afterCreateOrUpdate(async ({ after, pathArgs }) => {
		return {
			...after,
			pathArgs,
		}
	})

describe('trigger', function () {
	it('should process triggers', async function () {
		expect.hasAssertions()
		await db('frog', 'artur').delete()
		await db('frog', 'artur').set({ age: 20 })
		await expect(db('frog', 'artur').dataWithoutId()).resolves.toMatchObject({
			argId: 'artur',
			isAdmin: false,
			pathParams: { user: 'artur' },
			pathArgs: ['artur'],
			path: 'frog/artur',
			age: 20,
			// before: null,
		})
	})

	it('should cancel on exception', async () => {
		expect.hasAssertions()
		await db('frog', 'artur').delete()
		await db('frog', 'artur').set({ age: 999 })
		await db('frog', 'artur').set({ age: 935 })

		await expect(db('frog', 'artur').set({ age: 16 })).rejects.toThrow('frog too young')

		await expect(db('frog/artur').dataWithId()).resolves.toMatchObject({
			age: 935,
			isAdmin: false,
			id: 'artur',
			argId: 'artur',
			pathParams: { user: 'artur' },
			path: 'frog/artur',
			pathArgs: ['artur'],
		})
	})
})
