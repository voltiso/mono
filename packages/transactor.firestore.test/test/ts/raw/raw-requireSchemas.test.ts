// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { createFirestoreTransactor } from '@voltiso/transactor.firestore'

import { firestore } from '../common/firestore'

const db = createFirestoreTransactor(firestore, {
	requireSchemas: false,
	checkDecorators: false,
})
const dbWithSchema = createFirestoreTransactor(firestore, {
	requireSchemas: true,
	checkDecorators: false,
})

describe('raw-requireSchemas', () => {
	it('should respect constructor argument (false)', async () => {
		expect.hasAssertions()

		const doc = await db('television').add({ tvField: 123 })
		await db('television/ggggg').set({ zField: 234 })

		await expect(db('television', doc.id).data).resolves.toMatchObject({
			tvField: 123,
		})
		await expect(db('television', 'ggggg').data).resolves.toMatchObject({
			zField: 234,
		})
	})

	it('should respect dynamically changed requireSchema (to false)', async () => {
		expect.hasAssertions()

		dbWithSchema.requireSchemas = false
		const doc = await dbWithSchema('television').add({ tvField: 123 })
		await dbWithSchema('television/ggggg').set({ zField: 234 })

		await expect(
			dbWithSchema('television', doc.id).dataWithId(),
		).resolves.toMatchObject({
			id: doc.id,
			tvField: 123,
		})
		await expect(
			dbWithSchema('television', 'ggggg').dataWithId(),
		).resolves.toMatchObject({ id: 'ggggg', zField: 234 })

		dbWithSchema.requireSchemas = true
	})

	it('should respect constructor argument (true)', async () => {
		expect.hasAssertions()

		dbWithSchema.requireSchemas = true

		await expect(
			dbWithSchema('television').add({ tvField: 123 }),
		).rejects.toThrow('missing schema')
		await expect(
			dbWithSchema('television/ggggg').set({ zField: 234 }),
		).rejects.toThrow('missing schema')
	})

	it('should respect dynamically changed requireSchema (to true)', async () => {
		expect.hasAssertions()

		db.requireSchemas = true

		await expect(db('television').add({ tvField: 123 })).rejects.toThrow(
			'missing schema',
		)
		await expect(db('television/ggggg').set({ zField: 234 })).rejects.toThrow(
			'missing schema',
		)

		db.requireSchemas = false
	})
})
