// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import * as s from '@voltiso/schemar'
import { Doc, method, Transactor } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	requireSchemas: false,
})

const promises: PromiseLike<unknown>[] = []

class Counter extends Doc.with({
	id: s.string,

	public: {
		value: s.number.default(1),
	},
})
	.method('increment', function (x: number) {
		this.data.value += x
	})
	// .method(
	// 	'incrementChecked',
	// 	function (x) {
	// 		this.value += x
	// 	}
	// 	// number
	// )
	.method(
		'incrementObj',
		// 'incrementCheckedObj',
		function ({ incrementBy }: { incrementBy: number }) {
			this.data.value += incrementBy
		},
		// {
		// 	incrementBy: number,
		// }
	) {
	@method
	async floatSomePromises() {
		// const db = this.db
		promises.push(db('grandma/a').set({ age: 1 })) // A

		await db('grandma/a').set({ age: 1 })
		promises.push(db('grandma/a').set({ age: 1 })) // B
		await db('grandma/a').set({ age: 1 })
		promises.push(db('grandma/a').set({ age: 1 })) // C
	}
}

// type B = Counter[DTI]['methods']
// type A = InferTI.FromDoc<Counter>['methods']

const counters = db('office').register(Counter)

describe('method', function () {
	it('should process method', async function () {
		expect.hasAssertions()

		const counter = await counters.add({})
		const id = counter.id

		expect(id).toBeDefined()

		await counter.methods.increment(100)

		// should infer TI
		;() => counter.methods.floatSomePromises()

		await counters(id).methods.incrementObj({ incrementBy: 1000 })

		expect(counter.dataWithId()).toMatchObject({ id, value: 101 }) // this object is not updated!
		expect((await db('office', id))!.data['value']).toBe(1101)
	})

	it('should detect floating promises', async function () {
		expect.hasAssertions()

		await counters('asd').set({})
		try {
			await expect(counters('asd').methods.floatSomePromises()).rejects.toThrow(
				'numFloatingPromises: 3',
			)
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
