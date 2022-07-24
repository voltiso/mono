// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Doc } from '@voltiso/transactor'
import { createTransactor } from '@voltiso/transactor.firestore'
import * as s from '@voltiso/schemar'
import { firestore } from '../common/firestore.js'

const db = createTransactor(firestore, { requireSchemas: false })

const promises: PromiseLike<unknown>[] = []

// eslint-disable-next-line jest/require-hook
db('president/*')
	.public({ value: s.number.default(0) })
	.method('increment', function (this: Doc & { value: number }, x: number) {
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
		function ({ incrementBy }) {
			this['value'] += incrementBy
		},
		// {
		// 	incrementBy: number,
		// }
	)
	.method('floatSomePromises', async function () {
		console.log('floatSomePromises')
		// const db = this.db
		promises.push(db('thief/a').set({ age: 1 })) // A

		await db('thief/a').set({ age: 1 })
		promises.push(db('thief/a').set({ age: 1 })) // B
		await db('thief/a').set({ age: 1 })
		promises.push(db('thief/a').set({ age: 1 })) // C
	})

describe('raw-method', function () {
	it('should process method', async function () {
		expect.hasAssertions()

		const counter = await db('president').add({})
		const id = counter.id

		expect(id).toBeDefined()

		await counter.methods['increment']!(100)
		await db('president', id).methods['incrementObj']!({ incrementBy: 1000 })

		expect(counter.dataWithId()).toMatchObject({ id, value: 100 }) // this object is not updated!
		expect((await db('president', id))!['value']).toBe(1100)
	})

	it('should detect floating promises', async function () {
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
