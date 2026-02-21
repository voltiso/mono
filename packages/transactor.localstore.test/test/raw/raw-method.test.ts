// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { Doc } from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { createTransactor } from '../common'

const db = createTransactor({ requireSchemas: false, checkDecorators: false })

db('counter/*')
	.public({ value: s.number.default(0) })
	.method('increment', function (this: Doc & { value: number }, x: number) {
		this.value += x
	})
	.method('incrementObj', function (params: any) {
		this.data['value'] += params.incrementBy
	})
	.method('floatSomePromises', async () => {
		// console.log('floatSomePromises')
		void db('user/a').set({ age: 1 })

		await db('user/a').set({ age: 1 })
		void db('user/a').set({ age: 1 })
		await db('user/a').set({ age: 1 })
		void db('user/a').set({ age: 1 })
	})

describe('raw-method', () => {
	it('should process method', async () => {
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

	it('should detect floating promises', async () => {
		expect.hasAssertions()

		await db('counter/asd').set({})

		await expect(
			db('counter/asd').methods['floatSomePromises']!(),
		).rejects.toThrow('numFloatingPromises: 3')
	})
})
