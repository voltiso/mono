// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { firestore, srcFirestore } = require('./common/index.cjs')
const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

describe('floatingPromises', function () {
	it(
		'should detect floating promises',
		async function () {
			expect.hasAssertions()

			/** @type {PromiseLike<unknown>[]} */
			const p = []
			try {
				await expect(
					db.runTransaction(async db => {
						p.push(db('promise/a').set({ age: 1 })) // 1
						await db('promise/a').set({ age: 1 })
						for (let i = 0; i < 3; ++i) await db('promise/a').set({ age: 1 })

						await db('promise/a').set({ age: 1 })
						for (let i = 0; i < 3; ++i)
							p.push(db('promise/a').update({ age: 1 })) // 2 3 4

						p.push(db('promise/a').delete()) // 5
						await db('promise/a').set({ age: 1 })

						// @ts-expect-error ...
						if ((await db('promise/a').age) === 1)
							await db('promise/a').set({ age: 1 })

						p.push(db('promise').add({ age: 123 })) // 6
					}),
				).rejects.toThrow('numFloatingPromises: 6')
				expect(p).toHaveLength(6)
			} catch {}
			await Promise.all(
				p.map(async p => {
					try {
						await p
					} catch {}
				}),
			)
		},
		15 * 1000,
	)
})
