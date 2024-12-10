// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */

import { describe, expect, it } from '@jest/globals'
import { assert } from '@voltiso/assertor'
import type { Transaction } from '@voltiso/transactor'
import { createFirestoreTransactor } from '@voltiso/transactor.firestore'
import { sleep } from '@voltiso/util'

import { firestore } from '../common/firestore'

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})

describe('raw-transaction', () => {
	it('should use async storage (get)', async function () {
		expect.hasAssertions()

		await db.runTransaction(async t => {
			await t('userG/artur').set({ age: 934 })

			await expect(db('userG/artur').data['age']).resolves.toBe(934)
		})
	})

	it('should use async storage (update)', async function () {
		expect.hasAssertions()

		await db('userG/artur').set({ age: 12 })

		await expect(
			db.runTransaction(async () => {
				await db('userG/artur').set({ age: 934 })
				throw new Error('very bad')
			}),
		).rejects.toThrow('very bad')
		await expect(db('userG/artur').data['age']).resolves.toBe(12)
	})

	it('should detect access after transaction is committed', async function () {
		expect.hasAssertions()

		let t: Transaction
		// @ts-expect-error
		await db.runTransaction(db => {
			t = db
		})

		expect(() => t('userG/artur').set({ age: 994 })).toThrow('missing await')
	})

	it('should commit local object changes', async function () {
		expect.hasAssertions()

		await db.runTransaction(async db => {
			const adam = await db('userG/adam').set({ age: 123, x: 2 })
			adam.data['age'] = 234

			delete adam.data['x']

			expect(adam.data['age']).toBe(234)
			expect(adam.data['x']).toBeUndefined()
		})
		const adam = await db('userG/adam')

		// @ts-expect-error
		expect(adam!.age).toBe(234)

		assert(adam)

		expect(adam.data['x']).toBeUndefined()
	})

	it('should commit local object changes recursively', async function () {
		expect.hasAssertions()

		await db.runTransaction(async () => {
			const adam = await db('userG/adam').set({ address: { street: 'a' } })
			// @ts-expect-error
			adam.address.street = 'b'

			// @ts-expect-error
			expect(adam.address.street).toBe('b')
		})
		const adam = await db('userG/adam')

		// @ts-expect-error
		expect(adam.address.street).toBe('b')
	})

	it('should commit local object changes recursively after awaiting sub-objects', async function () {
		expect.hasAssertions()

		await db.runTransaction(async t => {
			const adam = await db('userG/adam').set({
				a: { b: { c: { d: { e: { f: { g: 1234 } } } } } },
			})
			// @ts-expect-error
			const c = await t('userG/adam').a.b.c

			expect(c.d.e).toStrictEqual({ f: { g: 1234 } })

			c.d = 99

			expect(c.d).toBe(99)
			// @ts-expect-error
			expect(adam.a.b.c.d).toBe(99)
			// @ts-expect-error
			expect((await db('userG', 'adam').a).b.c).toStrictEqual({ d: 99 })
		})
		const adam = await db('userG/adam')
		// @ts-expect-error
		const c = await db('userG/adam').a.b.c

		expect(c.d).toBe(99)
		// @ts-expect-error
		expect(adam.a.b.c.d).toBe(99)
		// @ts-expect-error
		expect((await db('userG', 'adam').a).b.c).toStrictEqual({ d: 99 })
	})

	it('should not allow transactions inside transactions', async function () {
		expect.hasAssertions()

		expect(db._transactionContext.hasValue).toBeFalsy()

		await expect(
			db.runTransaction(async () => {
				expect(db._transactionContext.hasValue).toBeTruthy()

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

	it('should not allow concurrent transactions', async () => {
		expect.hasAssertions()

		db.allowConcurrentTransactions = false

		const test = async () => {
			const a = db.runTransaction(async () => {
				await sleep(100)
			})

			const b = db.runTransaction(async () => {
				await sleep(100)
			})

			return Promise.all([a, b])
		}

		await expect(test()).rejects.toThrow('Concurrent transactions detected')
	})

	it('should warn if concurrent transactions are detected', async () => {
		expect.hasAssertions()

		db.allowConcurrentTransactions = 'warn'

		let _error

		db._options.onWarning = error => {
			_error = error
			// eslint-disable-next-line no-console
			console.warn(error)
		}

		const test = () =>
			db.runTransaction(async () => {
				await sleep(100)
				await db._runWithContext(
					{ transaction: {} as never, db: {} as never },
					// eslint-disable-next-line sonarjs/no-nested-functions
					async () => {
						await sleep(100)
						await db.runTransaction(async () => {
							await sleep(100)
						})
					},
				)
				await sleep(100)
			})

		await expect(test()).resolves.toBeUndefined()

		expect(_error).toMatchInlineSnapshot(
			'[TransactorError: Concurrent transactions detected. Set `allowConcurrentTransactions: true` to allow this]',
		)
	})
})
