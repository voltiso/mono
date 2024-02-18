// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

class Doctor extends Doc.with({
	id: s.string,

	public: s
		.object({
			specialty: s.string.optional,
		})
		.index(s.string.regex(/^unknown_.*$/u), s.number),
}) {}

const doctors = db('doctor').register(Doctor)

describe('public', function () {
	it('should validate schema', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

		await expect(
			// ! no longer supported - type-check passes here now
			// // @ts-expect-error `favoriteOrganMarket` does not exist on `Doctor`
			doctors('anthony').set({ favoriteOrganMarket: 'WHM' }),
		).rejects.toThrow('favoriteOrganMarket')

		await expect(doctors('anthony')).resolves.toBeNull()

		await expect(
			doctors('anthony').set({ favoriteOrganMarket: 123 }),
		).rejects.toThrow('index signature keys')

		await doctors('anthony').set({ unknown_favoriteOrganMarket: 123 })
	})
})
