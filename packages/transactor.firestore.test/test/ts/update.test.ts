// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { sVoltisoEntry, Transactor } from '@voltiso/transactor'
import { omit } from '@voltiso/util'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	requireSchemas: false,
	refCounters: false,
})

const doctors = db('doctor')

describe('update', function () {
	it('updates without returning data when no triggers or schemas', async function () {
		expect.hasAssertions()

		await doctors('anthony').delete()

		await expect(doctors('anthony').update({ asd: 1 })).rejects.toThrow(
			'NOT_FOUND',
		)

		await doctors('anthony').set({ asd: 1 })
		const r = await doctors('anthony').update({ sdf: 2 })

		expect(r).toBeUndefined()

		await expect(doctors('anthony').data).resolves.toMatchObject({
			__voltiso: omit(
				sVoltisoEntry.validate(undefined),
				'createdAt',
				'updatedAt',
			),

			asd: 1,
			sdf: 2,
		})
	})

	it('does not allow updates of deleted document', async function () {
		expect.hasAssertions()
		await expect(
			db.runTransaction(async () => {
				await doctors('anthony').delete()
				await doctors('anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('does not allow updates of deleted document #2', async function () {
		expect.hasAssertions()

		await doctors('anthony').delete()

		await expect(
			db.runTransaction(async () => {
				await doctors('anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('updates without returning data when no triggers or schemas - when in transaction', async function () {
		expect.hasAssertions()

		await doctors('anthony').set({ asd: 1 })
		await db.runTransaction(async () => {
			const r = await doctors('anthony').update({ sdf: 2 })

			expect(r).toBeUndefined()

			await expect(doctors('anthony').data).resolves.toMatchObject({
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
