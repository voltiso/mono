// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as s from '@voltiso/schemar'
import { createTransactor, Doc } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common'

const db = createTransactor(firestore, firestoreModule)

class Doctor extends Doc.public({
	specialty: s.string.optional,
}) {}

const doctors = db('tractor').register(Doctor)

describe('public', function () {
	it('should validate schema', async function () {
		expect.hasAssertions()

		await firestore.doc('tractor/anthony').delete()

		await expect(
			// @ts-expect-error
			doctors('anthony').set({ favoriteOrganMarket: 'WHM' }),
		).rejects.toThrow('favoriteOrganMarket')

		await expect(doctors('anthony')).resolves.toBeNull()
	})
})
