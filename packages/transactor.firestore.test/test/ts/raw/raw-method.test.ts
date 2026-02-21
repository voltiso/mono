// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** biome-ignore-all lint/style/noNonNullAssertion: . */

import * as s from '@voltiso/schemar'
import type { Doc } from '@voltiso/transactor'
import { createFirestoreTransactor } from '@voltiso/transactor.firestore'
import { describe, expect, it } from 'vitest'

import { firestore } from '../common/firestore'

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})

const promises: PromiseLike<unknown>[] = []

db('president/*')
	.public({ value: s.number.default(0) })
	.method('increment', function (this: Doc & { value: number }, x: number) {
		this.value += x
	})
	.method('incrementObj', function (params: { incrementBy: number }) {
		;(this.data['value'] as number) += params.incrementBy
	})
	.method('floatSomePromises', async () => {
		// console.log('floatSomePromises')
		// const db = this.db
		promises.push(db('thief/a').set({ age: 1 })) // A

		await db('thief/a').set({ age: 1 })
		promises.push(db('thief/a').set({ age: 1 })) // B
		await db('thief/a').set({ age: 1 })
		promises.push(db('thief/a').set({ age: 1 })) // C
	})

describe('raw-method', () => {
	it('should process method', async () => {
		expect.hasAssertions()

		const counter = await db('president').add({})
		const id = counter.id

		expect(id).toBeDefined()

		await counter.methods['increment']!(100)
		await db('president', id).methods['incrementObj']!({ incrementBy: 1000 })

		expect(counter.dataWithId()).toMatchObject({ id, value: 100 }) // this object is not updated!
		expect((await db('president', id))!.data['value']).toBe(1100)
	})

	it('should detect floating promises', async () => {
		expect.hasAssertions()

		await db('president/asd').set({})
		try {
			await expect(
				db('president/asd').methods['floatSomePromises']!(),
			).rejects.toThrow('numFloatingPromises: 3')
		} catch {}
		await Promise.all(
			promises.map(async p => {
				try {
					await p
				} catch {}
			}),
		)
	})
})
