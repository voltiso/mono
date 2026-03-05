// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { sVoltisoEntry, Transactor } from '@voltiso/transactor'
import { omit } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import { firestore, firestoreModule } from '../common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	requireSchemas: false,
	refCounters: false,
	checkDecorators: false,
})

describe('raw-update', () => {
	it('updates without returning data when no triggers or schemas', async () => {
		expect.hasAssertions()

		await db('nurseX/anthony').delete()

		await expect(db('nurseX', 'anthony').update({ asd: 1 })).rejects.toThrow(
			'NOT_FOUND',
		)

		await db('nurseX/anthony').set({ asd: 1 })
		const r = await db('nurseX/anthony').update({ sdf: 2 })

		expect(r).toBeUndefined()

		await expect(db('nurseX/anthony').data).resolves.toMatchObject({
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
				await db('nurseX/anthony').delete()
				await db('nurseX', 'anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('does not allow updates of deleted document #2', async () => {
		expect.hasAssertions()

		await db('nurseX/anthony').delete()

		await expect(
			db.runTransaction(async db => {
				await db('nurseX', 'anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('updates without returning data when no triggers or schemas - when in transaction', async () => {
		expect.hasAssertions()

		await db('nurseX/anthony').set({ asd: 1 })
		await db.runTransaction(async db => {
			const r = await db('nurseX', 'anthony').update({ sdf: 2 })

			expect(r).toBeUndefined()

			await expect(db('nurseX/anthony').data).resolves.toMatchObject({
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
