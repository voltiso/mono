// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getDefaultVoltisoEntry } from '@voltiso/transactor'
import { arraySetAddToIt, omit } from '@voltiso/util'

import { createTransactor, database } from './common'

const db = createTransactor({ requireSchemas: false, refCounters: false })

const doctors = db('doctor')

describe('update', function () {
	it('updates without returning data when no triggers or schemas', async function () {
		expect.hasAssertions()

		await doctors('anthony').delete()

		await expect(doctors('anthony').update({ asd: 1 })).rejects.toThrow(
			'NOT_FOUND',
		)

		await doctors('anthony').set({ asd: 1, arr: ['a', 1] })
		const r = await doctors('anthony').update({
			sdf: 2,
			arr: arraySetAddToIt<number | string>(1, 'b'),
		})

		expect(r).toBeUndefined()

		await expect(doctors('anthony').data).resolves.toMatchObject({
			__voltiso: omit(
				getDefaultVoltisoEntry({ transactor: db }, new Date()),
				'createdAt',
				'updatedAt',
			),

			asd: 1,
			sdf: 2,
			arr: ['a', 1, 'b'],
		})
	})

	it('does not allow updates of deleted document #1a', async function () {
		expect.hasAssertions()

		await expect(
			db.runTransaction(async () => {
				await doctors('anthony').delete()
				await doctors('anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('does not allow updates of deleted document #1b', async function () {
		expect.hasAssertions()

		await doctors('anthony2').set({ asd: 1 })

		await expect(
			db.runTransaction(async () => {
				await doctors('anthony2').delete()
				await doctors('anthony2').update({ asd: 1 })
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

			const anthonyData = await doctors('anthony').data

			expect(anthonyData).toMatchObject({
				__voltiso: omit(
					getDefaultVoltisoEntry({ transactor: db }, new Date()),
					'createdAt',
					'updatedAt',
				),

				asd: 1,
				sdf: 2,
			})
		})

		// // does not write default __voltiso to the db
		const rawAnthonyDoc = await database.doc('doctor/anthony').get()

		expect(rawAnthonyDoc.data()).toMatchObject({
			asd: 1,
			sdf: 2,
		})
	})
})
