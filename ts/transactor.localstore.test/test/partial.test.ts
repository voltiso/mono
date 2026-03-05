// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { createTransactor, database } from './common'

describe('partial', () => {
	it('throws on refCounting error if not partial', async () => {
		expect.hasAssertions()

		const db = createTransactor({
			requireSchemas: false,
			checkDecorators: false,
		})

		const otherItem = db('wallNoWall', 'cell2')

		await expect(
			db('wallNoWall', 'cell').set({ otherItem: otherItem.asStrongRef }),
		).rejects.toThrow('numRefs')

		await otherItem.set({})
		await db('wallNoWall', 'cell').set({ otherItem: otherItem.asStrongRef })

		await expect(db('wallNoWall', 'cell2').__voltiso).resolves.toMatchObject({
			numRefs: 1,
		})

		await expect(db('wallNoWall', 'cell2').delete()).rejects.toThrow('numRefs')

		await database.doc('wallNoWall/cell2').delete()

		await expect(db('wallNoWall', 'cell').delete()).rejects.toThrow(
			'database corrupt',
		)

		// const partialDb = createTransactor({ requireSchemas: false, partial: true })
		db.partial = true

		await expect(db('wallNoWall', 'cell')).resolves.not.toBeNull()

		// console.log('WILL DELETE')

		await db('wallNoWall', 'cell').delete()
	})
})
