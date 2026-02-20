// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $assert } from '@voltiso/assertor'
import type { Transaction } from '@voltiso/transactor'

import { createTransactor } from '../common'

const db = createTransactor({ requireSchemas: false, checkDecorators: false })

describe('raw-transaction', () => {
	it('should detect concurrent transactions', async () => {
		expect.hasAssertions()

		const oldOption = db.allowConcurrentTransactions
		db.allowConcurrentTransactions = false

		const run = async () => {
			const p1 = db.runTransaction(async t => {
				await t('user/artur').set({ age: 1 })
				await t('user/artur').set({ age: 2 })
			})

			const p2 = db.runTransaction(async t => {
				await t('user/artur').set({ age: 3 })
				await t('user/artur').set({ age: 4 })
			})
			await Promise.all([p1, p2])
		}

		await expect(run()).rejects.toThrow('Concurrent transactions detected')

		db.allowConcurrentTransactions = oldOption
	})

	it('should use async storage (get)', async () => {
		expect.hasAssertions()

		const oldOptions = db.allowConcurrentTransactions
		db.allowConcurrentTransactions = true // random check, unrelated to the rest of this test

		await db.runTransaction(async t => {
			await t('user/artur').set({ age: 934 })

			const ref = db('user/artur')

			await expect(ref.data['age']).resolves.toBe(934)
		})

		db.allowConcurrentTransactions = oldOptions
	})

	it('should use async storage (update)', async () => {
		expect.hasAssertions()

		await db('user/artur').set({ age: 12 })

		await expect(
			db.runTransaction(async () => {
				await db('user/artur').set({ age: 934 })
				throw new Error('veryBadError')
			}),
		).rejects.toThrow('veryBadError')
		await expect(db('user/artur').data['age']).resolves.toBe(12)
	})

	it('should detect access after transaction is committed', async () => {
		expect.hasAssertions()

		let t: Transaction
		// @ts-expect-error ...
		await db.runTransaction(db => {
			t = db
		})

		expect(() => t('user/artur').set({ age: 994 })).toThrow('missing await')
	})

	it('should detect floating promises', async () => {
		expect.hasAssertions()
		await expect(
			db.runTransaction(async t => {
				void db('user/a').set({ age: 1 }) // 1
				await t('user/a').set({ age: 1 })
				for (let i = 0; i < 3; ++i) await db('user/a').set({ age: 1 })

				await db('user/a').set({ age: 1 })
				for (let i = 0; i < 3; ++i) void db('user/a').update({ age: 1 }) // 2 3 4

				void t('user/a').delete() // 5
				await db('user/a').set({ age: 1 })

				// @ts-expect-error ...

				if ((await db('user/a').age) === 1) await db('user/a').set({ age: 1 })

				void db('user').add({ age: 123 }) // 6
				void db('user/a').get() // 7
			}),
		).rejects.toThrow('numFloatingPromises: 7')
	})

	it('should commit local object changes', async () => {
		expect.hasAssertions()

		await db.runTransaction(async db => {
			const adam = await db('user/adam').set({ age: 123, x: 2, arr: [1, 2, 3] })
			adam.data['age'] = 234

			delete adam.data['x']

			;(adam.data['arr'] as any).push(4)

			expect(adam.data['age']).toBe(234)
			expect(adam.data['x']).toBeUndefined()
			expect(adam.data['arr']).toStrictEqual([1, 2, 3, 4])
		})

		const adam = await db('user/adam')

		// @ts-expect-error ...
		expect(adam.data.age).toBe(234)

		$assert(adam)

		expect(adam.data['x']).toBeUndefined()
		expect(adam.data['arr']).toStrictEqual([1, 2, 3, 4])
	})

	it('should commit local object changes recursively', async () => {
		expect.hasAssertions()

		await db.runTransaction(async () => {
			const adam = await db('user/adam').set({ address: { street: 'a' } })
			// @ts-expect-error ...
			adam.address.street = 'b'

			// @ts-expect-error ...
			expect(adam.address.street).toBe('b')
		})
		const adam = await db('user/adam')

		// @ts-expect-error ...
		expect(adam.address.street).toBe('b')
	})

	it('should commit local object changes recursively after awaiting sub-objects', async () => {
		expect.hasAssertions()

		await db.runTransaction(async t => {
			const adam = await db('user/adam').set({
				a: { b: { c: { d: { e: { f: { g: 1234 } } } } } },
			})
			// @ts-expect-error ...
			const c = await t('user/adam').a.b.c

			expect(c.d.e).toStrictEqual({ f: { g: 1234 } })

			c.d = 99

			expect(c.d).toBe(99)
			// @ts-expect-error ...
			expect(adam.a.b.c.d).toBe(99)
			// @ts-expect-error ...
			expect((await db('user', 'adam').a).b.c).toStrictEqual({ d: 99 })
		})
		const adam = await db('user/adam')
		// @ts-expect-error ...
		const c = await db('user/adam').a.b.c

		expect(c.d).toBe(99)
		// @ts-expect-error ...
		expect(adam.a.b.c.d).toBe(99)
		// @ts-expect-error ...
		expect((await db('user', 'adam').a).b.c).toStrictEqual({ d: 99 })
	})

	it('should ignore transactions inside transactions', async () => {
		expect.hasAssertions()
		await expect(
			db.runTransaction(async () => {
				await db.runTransaction(async () => {
					//
				})
			}),
		).resolves.toBeUndefined() // .rejects.toThrow('transaction')
	})

	it('should rollback doc creation', async () => {
		expect.hasAssertions()

		let id = ''

		await expect(
			db.runTransaction(async () => {
				const doc = await db('col').add({ test: 1 })
				id = doc.id
				throw new Error('test')
			}),
		).rejects.toThrow('test')

		await expect(db('col', id)).resolves.toBeNull()
	})
})
