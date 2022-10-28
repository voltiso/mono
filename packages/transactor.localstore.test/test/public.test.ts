// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

class Doctor extends Doc.public(
	s
		.object({
			specialty: s.string.optional,
		})
		.index(s.string.regex(/^unknown_.*$/u), s.number),
) {}

const doctors = db('doctor').register(Doctor)

describe('public', function () {
	it('should validate schema', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

		await expect(
			// @ts-expect-error `favoriteOrganMarket` does not exist on `Doctor`
			doctors('anthony').set({ favoriteOrganMarket: 'WHM' }),
		).rejects.toThrow('favoriteOrganMarket')

		await expect(doctors('anthony')).resolves.toBeNull()

		await expect(
			doctors('anthony').set({ favoriteOrganMarket: 123 }),
		).rejects.toThrow('index signature keys')

		await doctors('anthony').set({ unknown_favoriteOrganMarket: 123 })
	})
})

// const a = s
// 	.object({
// 		specialty: s.string.optional,
// 	})
// 	.index(s.string.regex(/^unknown_.*$/u), s.number)

// type Out = typeof a.OutputType

// type B = Doctor[DTI]['public']
// type BF = IndexedDocTI['public']

// type A = GetPublicCreationInputData<Doctor[DTI], Doctor>
// type bB = GetPublicCreationInputData<IndexedDocTI, Doctor>

// const x = s.object.index(s.string,2)
// type AA = typeof x.OutputType

// type XX = t.Object<Record<string, $$Schemable>>
