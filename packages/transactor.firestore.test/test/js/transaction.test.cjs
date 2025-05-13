// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable no-implicit-globals */

'use strict'

const { describe, expect, it } = require('@jest/globals')
const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

function promiseConstructorName() {
	// eslint-disable-next-line promise/spec-only
	return Promise.name
}

function checkPromiseConstructorName() {
	const name = promiseConstructorName()
	// eslint-disable-next-line no-console
	console.log(`Promise.name === ${name}`)

	if (name !== 'ZoneAwarePromise') {
		throw new Error(`zone.js not imported correctly: Promise.name === ${name}`)
	}
}

function implicitPromiseConstructorName() {
	return (async () => {})().constructor.name
}

function checkImplicitPromiseConstructorName() {
	const name = implicitPromiseConstructorName()

	// eslint-disable-next-line no-console
	console.log(`implicit Promise constructor name: ${name}`)

	if (name !== 'ZoneAwarePromise') {
		throw new Error(
			`zone.js not imported correctly: implicit Promise constructor name === ${name}. Make sure to transpile to ES2016 or earlier.`,
		)
	}
}

// eslint-disable-next-line jest/require-hook
checkPromiseConstructorName()

// eslint-disable-next-line jest/require-hook
checkImplicitPromiseConstructorName()

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})

describe('transaction', function () {
	it('should use async storage (get)', async () => {
		expect.hasAssertions()

		expect(db._transactionContext.hasValue).toBeFalsy()

		await db.runTransaction(async t => {
			expect(db._transactionContext.hasValue).toBeTruthy()

			await t('visitorJ/artur')

			expect(db._transactionContext.hasValue).toBeTruthy()

			await t('visitorJ/artur').set({ age: 934 })

			expect(db._transactionContext.hasValue).toBeTruthy()
			await expect(db('visitorJ/artur').data['age']).resolves.toBe(934)
		})
	})

	it('should use async storage (update)', async function () {
		expect.hasAssertions()

		await db('visitor/artur').set({ age: 12 })

		await expect(
			db.runTransaction(async () => {
				await db('visitor/artur').set({ age: 934 })
				throw new Error('my-error-message')
			}),
		).rejects.toThrow('my-error-message')

		await expect(db('visitor/artur').data['age']).resolves.toBe(12)
	})

	it('should detect access after transaction is committed', async function () {
		expect.hasAssertions()

		// @ts-expect-error ...
		let t
		await db.runTransaction(async db => {
			t = db
		})

		// @ts-expect-error ...
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
		expect(() => t('visitor/artur').set({ age: 994 })).toThrow('missing await')
	})

	it('should commit local object changes', async function () {
		expect.hasAssertions()

		await db.runTransaction(async db => {
			const adam = await db('visitor/adam').set({ age: 123 })
			// @ts-expect-error ...
			adam.age = 234

			// @ts-expect-error ...
			expect(adam.age).toBe(234)
		})
		const adam = await db('visitor/adam')

		// @ts-expect-error ...
		expect(adam.age).toBe(234)
	})

	it('should commit local object changes recursively', async function () {
		expect.hasAssertions()

		await db.runTransaction(async db => {
			const adam = await db('visitor/adam').set({ address: { street: 'a' } })
			// @ts-expect-error ...
			adam.address.street = 'b'

			// @ts-expect-error ...
			expect(adam.address.street).toBe('b')
		})
		const adam = await db('visitor/adam')

		// @ts-expect-error ...
		expect(adam.address.street).toBe('b')
	})

	it('should commit local object changes recursively after awaiting sub-objects', async () => {
		expect.hasAssertions()

		await db.runTransaction(async db => {
			const adam = await db('visitor/adam').set({
				a: { b: { c: { d: { e: { f: { g: 1234 } } } } } },
			})
			// @ts-expect-error ...
			const c = await db('visitor/adam').a.b.c

			expect(c.d.e).toStrictEqual({ f: { g: 1234 } })

			c.d = 99

			expect(c.d).toBe(99)
			// @ts-expect-error ...
			expect(adam.a.b.c.d).toBe(99)
			// @ts-expect-error ...
			expect((await db('visitor', 'adam').a).b.c).toStrictEqual({ d: 99 })
		})
		const adam = await db('visitor/adam')
		// @ts-expect-error ...
		const c = await db('visitor/adam').a.b.c

		expect(c.d).toBe(99)
		// @ts-expect-error ...
		expect(adam.a.b.c.d).toBe(99)
		// @ts-expect-error ...
		expect((await db('visitor', 'adam').a).b.c).toStrictEqual({ d: 99 })
	})

	it('should commit local object changes recursively after awaiting sub-objects - even if no explicit write was done', async () => {
		expect.hasAssertions()

		await db('visitor/adam').set({
			a: { b: { c: { d: { e: { f: { g: 1234 } } } } } },
		})
		await db.runTransaction(async () => {
			const adam = await db('visitor/adam')
			// @ts-expect-error ...
			const c = await db('visitor/adam').a.b.c

			expect(c.d.e).toStrictEqual({ f: { g: 1234 } })

			c.d = 99

			expect(c.d).toBe(99)
			// @ts-expect-error ...
			expect(adam.a.b.c.d).toBe(99)
			// @ts-expect-error ...
			expect((await db('visitor', 'adam').a).b.c).toStrictEqual({ d: 99 })
		})
		const adam = await db('visitor/adam')
		// @ts-expect-error ...
		const c = await db('visitor/adam').a.b.c

		expect(c.d).toBe(99)
		// @ts-expect-error ...
		expect(adam.a.b.c.d).toBe(99)
		// @ts-expect-error ...
		expect((await db('visitor', 'adam').a).b.c).toStrictEqual({ d: 99 })
	})
})
