// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createTransactor } from '../common'

const db = createTransactor({ requireSchemas: false })
const dbWithSchema = createTransactor({ requireSchemas: true })

describe('raw-requireSchemas', function () {
	it('should respect constructor argument (false)', async function () {
		expect.hasAssertions()

		const doc = await db('mystic').add({ mysticField: 123 })
		await db('mystic/ggggg').set({ otherField: 234 })

		await expect(db('mystic', doc.id).dataWithId()).resolves.toMatchObject({
			id: doc.id,
			mysticField: 123,
		})
		await expect(db('mystic', 'ggggg').data).resolves.toMatchObject({
			otherField: 234,
		})
	})

	it('should respect dynamically changed requireSchema (to false)', async function () {
		expect.hasAssertions()

		dbWithSchema.requireSchemas = false
		const doc = await dbWithSchema('mystic').add({ mysticField: 123 })
		await dbWithSchema('mystic/ggggg').set({ otherField: 234 })

		await expect(
			dbWithSchema('mystic', doc.id).dataWithId(),
		).resolves.toMatchObject({
			id: doc.id,
			mysticField: 123,
		})
		await expect(
			dbWithSchema('mystic', 'ggggg').dataWithId(),
		).resolves.toMatchObject({ id: 'ggggg', otherField: 234 })

		dbWithSchema.requireSchemas = true
	})

	it('should respect constructor argument (true)', async function () {
		expect.hasAssertions()

		dbWithSchema.requireSchemas = true

		await expect(
			dbWithSchema('mystic').add({ mysticField: 123 }),
		).rejects.toThrow('missing schema')
		await expect(
			dbWithSchema('mystic/ggggg').set({ otherField: 234 }),
		).rejects.toThrow('missing schema')
	})

	it('should respect dynamically changed requireSchema (to true)', async function () {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(db('mystic').add({ mysticField: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(db('mystic/ggggg').set({ otherField: 234 })).rejects.toThrow(
			'missing schema',
		)

		db.requireSchemas = false
	})
})
