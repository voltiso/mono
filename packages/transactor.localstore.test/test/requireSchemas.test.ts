// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { createTransactor } from './common'

const db = createTransactor({ requireSchemas: false, checkDecorators: false })

const dbWithSchema = createTransactor({
	requireSchemas: true,
	checkDecorators: false,
})

const items = db('foo')
const itemsWithSchema = dbWithSchema('foo')

describe('requireSchemas', () => {
	it('should respect constructor argument (false)', async () => {
		expect.hasAssertions()

		const foo = await items.add({ someValue: 123 })
		await items('ggggg').set({ someOtherValue: 234 })

		await expect(items(foo.id).data).resolves.toMatchObject({ someValue: 123 })
		await expect(items('ggggg').data).resolves.toMatchObject({
			someOtherValue: 234,
		})
	})

	it('should respect constructor argument (true)', async () => {
		expect.hasAssertions()
		await expect(itemsWithSchema.add({ someValue: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(
			itemsWithSchema('ggggg').set({ someOtherValue: 234 }),
		).rejects.toThrow('missing schema')
	})

	it('should respect dynamically changed requireSchema (to false)', async () => {
		expect.hasAssertions()

		dbWithSchema.requireSchemas = false
		const doc = await itemsWithSchema.add({ someValue: 123 })
		await itemsWithSchema('ggggg').set({ someOtherValue: 234 })

		await expect(itemsWithSchema(doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			someValue: 123,
		})
		await expect(itemsWithSchema('ggggg').dataWithId()).resolves.toMatchObject({
			id: 'ggggg',
			someOtherValue: 234,
		})

		dbWithSchema.requireSchemas = true
	})

	it('should respect dynamically changed requireSchema (to true)', async () => {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(items.add({ someValue: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(items('ggggg').set({ someOtherValue: 234 })).rejects.toThrow(
			'missing schema',
		)

		db.requireSchemas = false
	})
})
