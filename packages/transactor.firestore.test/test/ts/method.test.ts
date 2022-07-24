// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { createTransactor, Doc } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore.js'

const db = createTransactor(firestore, firestoreModule, {
	requireSchemas: false,
})

const promises: PromiseLike<unknown>[] = []

class Counter extends Doc.public({
	value: s.number.default(1),
})
	.method('increment', function (x: number) {
		this.value += x
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
			this.value += incrementBy
		},
		// {
		// 	incrementBy: number,
		// }
	)
	.method('floatSomePromises', async function () {
		// const db = this.db
		promises.push(db('grandma/a').set({ age: 1 })) // A

		await db('grandma/a').set({ age: 1 })
		promises.push(db('grandma/a').set({ age: 1 })) // B
		await db('grandma/a').set({ age: 1 })
		promises.push(db('grandma/a').set({ age: 1 })) // C
	}) {}

const counters = db('office').register(Counter)

describe('method', function () {
	it('should process method', async function () {
		expect.hasAssertions()

		const counter = await counters.add({})
		const id = counter.id

		expect(id).toBeDefined()

		await counter.increment(100)
		await counters(id).incrementObj({ incrementBy: 1000 })

		expect(counter.dataWithId()).toMatchObject({ id, value: 101 }) // this object is not updated!
		expect((await db('office', id))!['value']).toBe(1101)
	})

	it('should detect floating promises', async function () {
		expect.hasAssertions()

		await counters('asd').set({})
		try {
			await expect(counters('asd').floatSomePromises()).rejects.toThrow(
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
