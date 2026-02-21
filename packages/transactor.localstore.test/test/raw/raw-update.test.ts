// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { sVoltisoEntry } from '@voltiso/transactor'
import { omit } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import { createTransactor } from '../common'

const db = createTransactor({
	requireSchemas: false,
	refCounters: false,
	checkDecorators: false,
})

describe('raw-update', () => {
	it('updates without returning data when no triggers or schemas', async () => {
		expect.hasAssertions()

		await db('doctor/anthony').delete()

		await expect(db('doctor', 'anthony').update({ asd: 1 })).rejects.toThrow(
			'NOT_FOUND',
		)

		await db('doctor/anthony').set({ asd: 1 })
		const r = await db('doctor/anthony').update({ sdf: 2 })

		expect(r).toBeUndefined()

		await expect(db('doctor/anthony').data).resolves.toMatchObject({
			__voltiso: omit(
				sVoltisoEntry.validate(undefined),
				'createdAt',
				'updatedAt',
			),

			asd: 1,
			sdf: 2,
		})
	})

	it('does not allow updates of deleted document', async () => {
		expect.hasAssertions()
		await expect(
			db.runTransaction(async db => {
				await db('doctor/anthony').delete()
				await db('doctor', 'anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('does not allow updates of deleted document #2', async () => {
		expect.hasAssertions()

		await db('doctor/anthony').delete()

		await expect(
			db.runTransaction(async db => {
				await db('doctor', 'anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('updates without returning data when no triggers or schemas - when in transaction', async () => {
		expect.hasAssertions()

		await db('doctor/anthony').set({ asd: 1 })
		await db.runTransaction(async db => {
			const r = await db('doctor', 'anthony').update({ sdf: 2 })

			expect(r).toBeUndefined()

			await expect(db('doctor/anthony').data).resolves.toMatchObject({
				__voltiso: omit(
					sVoltisoEntry.validate(undefined),
					'createdAt',
					'updatedAt',
				),

				asd: 1,
				sdf: 2,
			})
		})
	})
})
