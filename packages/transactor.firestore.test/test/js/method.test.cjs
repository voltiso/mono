// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

'use strict'

const { firestore, srcFirestore } = require('./common/index.cjs')

const { createFirestoreTransactor } = srcFirestore

const db = createFirestoreTransactor(firestore, { requireSchemas: false })

/** @type {PromiseLike<unknown>[]} */
const promises = []

// eslint-disable-next-line jest/require-hook
db('counterAbc/*')
	.afterCreateOrUpdate(function () {
		this.data['value'] ||= 0
	})
	.method('increment', function (x) {
		// @ts-expect-error ...
		// eslint-disable-next-line @typescript-eslint/restrict-plus-operands
		this.value += x
	})
	.method('floatSomePromises', async function () {
		// const { db } = this
		promises.push(db('dinosaurAbc/a').set({ age: 1 })) // A
		await db('dinosaurAbc/a').set({ age: 1 })
		promises.push(db('dinosaurAbc/a').set({ age: 1 })) // B
		await db('dinosaurAbc/b').set({ age: 1 })
		promises.push(db('dinosaurAbc/b').set({ age: 1 })) // C
	})

describe('method', function () {
	it('should process method', async () => {
		expect.hasAssertions()

		const counter = await db('counterAbc').add({})
		const id = counter.id

		expect(id).toBeDefined()

		// @ts-expect-error ...
		await counter.methods.increment(100)
		// @ts-expect-error ...
		await counter.methods.increment(1000)

		// @ts-expect-error ...
		expect(counter.value).toBe(1100)
		expect(counter.dataWithId()).toMatchObject({ id, value: 1100 })

		// @ts-expect-error ...
		await expect(db('counterAbc', id).value).resolves.toBe(1100)
	})

	it(
		'should detect floating promises',
		async () => {
			expect.hasAssertions()

			await db('counterAbc/asd').set({})
			try {
				await expect(
					// @ts-expect-error ...
					db('counterAbc/asd').methods.floatSomePromises(),
				).rejects.toThrow('numFloatingPromises: 3')
			} catch {}

			// console.log('await Promise.all')
			await Promise.all(
				promises.map(async p => {
					try {
						await p
					} catch {}
				}),
			)
			// console.log('done.')
		},
		20 * 1000,
	)
})
