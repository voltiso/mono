// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor } from './common'

const db = createTransactor({ requireSchemas: false })

class Counter extends Doc.public({
	value: s.number.default(1),
})

	.method('increment', function (x: number) {
		this.value += x
	})

	.method('incrementObj', function ({ incrementBy }: { incrementBy: number }) {
		this.value += incrementBy
	})

	.method('floatSomePromises', async function () {
		// const db = this.db
		void db('user/a').set({ age: 1 })

		await db('user/a').set({ age: 1 })
		void db('user/a').set({ age: 1 })
		await db('user/a').set({ age: 1 })
		void db('user/a').set({ age: 1 })
	}) {}

const counters = db('counter').register(Counter)

describe('method', function () {
	it('should process method', async function () {
		expect.hasAssertions()

		const counter = await counters.add({})
		const { id } = counter

		expect(id).toBeDefined()

		await counter.increment(100)
		await counters(id).incrementObj({ incrementBy: 1000 })

		expect(counter.dataWithId()).toMatchObject({ id, value: 101 }) // this object is not updated!
		expect((await db('counter', id))!['value']).toBe(1101)
	})

	it('should detect floating promises', async function () {
		expect.hasAssertions()

		await counters('asd').set({})

		await expect(counters('asd').floatSomePromises()).rejects.toThrow(
			'numFloatingPromises: 3',
		)
	})

	it('method inside transaction', async () => {
		expect.hasAssertions()

		await counters('asd').set({})

		await db.runTransaction(async () => {
			await counters('asd').increment(2)

			await expect(counters('asd').data.value).resolves.toBe(3)
		})

		await expect(counters('asd').data.value).resolves.toBe(3)
	})

	it('method inside failed transaction', async () => {
		expect.hasAssertions()

		await counters('asd').set({})

		const promise = db.runTransaction(async () => {
			await counters('asd').increment(2)

			await expect(counters('asd').data.value).resolves.toBe(3)

			throw new Error('qwerty')
		})

		await expect(promise).rejects.toThrow('qwerty')

		await expect(counters('asd').data.value).resolves.toBe(1)
	})
})
