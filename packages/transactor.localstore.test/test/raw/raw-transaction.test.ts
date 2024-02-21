// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import type { Transaction } from '@voltiso/transactor'

import { createTransactor } from '../common'

const db = createTransactor({ requireSchemas: false })

describe('raw-transaction', function () {
	it('should use async storage (get)', async function () {
		expect.hasAssertions()

		await db.runTransaction(async t => {
			await t('user/artur').set({ age: 934 })

			const ref = db('user/artur')

			await expect(ref.data['age']).resolves.toBe(934)
		})
	})

	it('should use async storage (update)', async function () {
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

	it('should detect access after transaction is committed', async function () {
		expect.hasAssertions()

		let t: Transaction
		// @ts-expect-error ...
		await db.runTransaction(db => {
			t = db
		})

		expect(() => t('user/artur').set({ age: 994 })).toThrow('missing await')
	})

	it('should detect floating promises', async function () {
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

	it('should commit local object changes', async function () {
		expect.hasAssertions()

		await db.runTransaction(async db => {
			const adam = await db('user/adam').set({ age: 123, x: 2, arr: [1, 2, 3] })
			adam.data['age'] = 234
			// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
			delete adam.data['x']
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
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

	it('should commit local object changes recursively', async function () {
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

	it('should commit local object changes recursively after awaiting sub-objects', async function () {
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

	it('should ignore transactions inside transactions', async function () {
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
