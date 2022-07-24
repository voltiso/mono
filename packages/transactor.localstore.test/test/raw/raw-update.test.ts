// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createTransactor } from '../common'

const db = createTransactor({ requireSchemas: false, refCounters: false })

describe('raw-update', function () {
	it('updates without returning data when no triggers or schemas', async function () {
		expect.hasAssertions()

		await db('doctor/anthony').delete()

		await expect(db('doctor', 'anthony').update({ asd: 1 })).rejects.toThrow(
			'NOT_FOUND',
		)

		await db('doctor/anthony').set({ asd: 1 })
		const r = await db('doctor/anthony').update({ sdf: 2 })

		expect(r).toBeUndefined()

		await expect(db('doctor/anthony').dataWithoutId()).resolves.toStrictEqual({
			asd: 1,
			sdf: 2,
		})
	})

	it('does not allow updates of deleted document', async function () {
		expect.hasAssertions()
		await expect(
			db.runTransaction(async db => {
				await db('doctor/anthony').delete()
				await db('doctor', 'anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('does not allow updates of deleted document #2', async function () {
		expect.hasAssertions()

		await db('doctor/anthony').delete()

		await expect(
			db.runTransaction(async db => {
				await db('doctor', 'anthony').update({ asd: 1 })
			}),
		).rejects.toThrow('NOT_FOUND')
	})

	it('updates without returning data when no triggers or schemas - when in transaction', async function () {
		expect.hasAssertions()

		await db('doctor/anthony').set({ asd: 1 })
		await db.runTransaction(async db => {
			const r = await db('doctor', 'anthony').update({ sdf: 2 })

			expect(r).toBeUndefined()

			await expect(db('doctor/anthony').dataWithoutId()).resolves.toStrictEqual(
				{ asd: 1, sdf: 2 },
			)
		})
	})
})
