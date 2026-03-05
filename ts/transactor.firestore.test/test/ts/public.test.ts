// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc, Transactor } from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { firestore, firestoreModule } from './common'

const db = new Transactor(firestore, firestoreModule, {
	checkDecorators: false,
})

class Doctor extends Doc.with({
	id: s.string,

	private: {
		specialty: s.string,
	},
}) {}

const doctors = db('tractorXyz').register(Doctor)

describe('public', () => {
	it('should validate schema', async () => {
		expect.hasAssertions()

		await firestore.doc('tractor/anthony').delete()

		await expect(
			// @ts-expect-error no such field
			doctors('anthony').set({ favoriteOrganMarket: 'WHM' }),
		).rejects.toThrow('favoriteOrganMarket')

		await expect(doctors('anthony')).resolves.toBeNull()
	})

	it('should validate required fields - no transaction', async () => {
		expect.hasAssertions()

		await firestore.doc('tractor/anthonyXyz').delete()

		await expect(doctors('anthonyXyz').set({})).rejects.toThrow('specialty')

		await expect(doctors('anthonyXyz')).resolves.toBeNull()
	})

	it('should validate required fields - transaction', async () => {
		expect.hasAssertions()

		await firestore.doc('tractor/anthonyAbc').delete()

		const promise = db.runTransaction(async t => {
			await expect(doctors('anthonyAbc').set({})).rejects.toThrow('specialty')

			expect(t._error).not.toBeNull()

			await expect(async () => {
				await doctors('anthonyAbc')
			}).rejects.toThrow('supposed to fail')
		})

		await expect(promise).rejects.toThrow('specialty')

		await expect(doctors('anthonyAbc')).resolves.toBeNull()
	})
})
