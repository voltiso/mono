// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { createFirestoreTransactor, firestore } from '../common/firestore'

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

describe('raw-floatingPromises', () => {
	it(
		'should detect floating promises',
		async () => {
			expect.hasAssertions()

			const p: PromiseLike<unknown>[] = []
			try {
				await expect(
					db.runTransaction(async t => {
						p.push(db('hint/a').set({ age: 1 })) // 1
						await t('hint/b').set({ age: 1 })
						for (let i = 0; i < 3; ++i) await db(`hint/c${i}`).set({ age: 1 })

						await db('hint/d').set({ age: 1 })
						for (let i = 0; i < 3; ++i) {
							p.push(db('hint/e').update({ age: 1 })) // 2 3 4
						}

						p.push(t('hint/f').delete()) // 5
						await db('hint/g').set({ age: 1 })

						if ((await db('hint/h').data['age']) === 1)
							await db('hint/i').set({ age: 1 })

						p.push(db('hint').add({ age: 123 })) // 6
					}),
				).rejects.toThrow('numFloatingPromises: 6')

				expect(p).toHaveLength(6)
			} catch {}

			await Promise.all(
				p.map(async x => {
					try {
						await x
					} catch {}
				}),
			)
		},
		15 * 1000,
	)
})
