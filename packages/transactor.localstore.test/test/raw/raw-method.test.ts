// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import type { Doc } from '@voltiso/transactor'

import { createTransactor } from '../common'

const db = createTransactor({ requireSchemas: false, checkDecorators: false })

// eslint-disable-next-line jest/require-hook
db('counter/*')
	.public({ value: s.number.default(0) })
	.method('increment', function (this: Doc & { value: number }, x: number) {
		this.value += x
	})
	.method('incrementObj', function (params: any) {
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		this.data['value'] += params.incrementBy
	})
	.method('floatSomePromises', async function () {
		// console.log('floatSomePromises')
		void db('user/a').set({ age: 1 })

		await db('user/a').set({ age: 1 })
		void db('user/a').set({ age: 1 })
		await db('user/a').set({ age: 1 })
		void db('user/a').set({ age: 1 })
	})

describe('raw-method', function () {
	it('should process method', async function () {
		expect.hasAssertions()

		const counter = await db('counter').add({})

		expect(counter.id).toBeDefined()

		await counter.methods['increment']!(100)
		await db('counter', counter.id).methods['incrementObj']!({
			incrementBy: 1000,
		})

		expect(counter.dataWithId()).toMatchObject({ id: counter.id, value: 100 }) // this object is not updated!
		expect((await db('counter', counter.id))!.data['value']).toBe(1100)
	})

	it('should detect floating promises', async function () {
		expect.hasAssertions()

		await db('counter/asd').set({})

		await expect(
			db('counter/asd').methods['floatSomePromises']!(),
		).rejects.toThrow('numFloatingPromises: 3')
	})
})
