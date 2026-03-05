// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { Doc, Transactor } from '@voltiso/transactor'
import { describe, expect, it } from 'vitest'

import { firestore, firestoreModule } from './common/firestore'

const db = new Transactor(firestore, firestoreModule, {
	checkDecorators: false,
})

class Doctor extends Doc.with({
	id: s.string,

	public: {
		specialty: s.string.optional,
	},

	private: {
		ofWhat: s.string.optional,
	},
}).afterCreate(function () {
	if (this.data.specialty === 'master') this.data.ofWhat = 'universe'
}) {}

const doctors = db('doctorX').register(Doctor)

describe('afterCreate', () => {
	it('triggers on creation', async () => {
		expect.hasAssertions()

		await firestore.doc('doctorX/anthony').delete()

		await expect(
			// @ts-expect-error `ofWhat` is private
			doctors('anthony').set({ ofWhat: 'neurosurgery' }),
		).rejects.toThrow('ofWhat')
		await expect(doctors('anthony')).resolves.toBeNull()

		await doctors.add({
			id: 'anthony' as never,
			specialty: 'master',
		})

		await expect(doctors('anthony').data.ofWhat).resolves.toBe('universe')
	})

	it('does not trigger on update', async () => {
		expect.hasAssertions()

		await firestore.doc('doctorX/anthony').delete()

		await doctors.add({
			id: 'anthony' as never,
		})

		await expect(doctors('anthony').data.ofWhat).rejects.toThrow(
			'does not exist',
		)

		await doctors('anthony').update({
			specialty: 'master',
		})

		await expect(doctors('anthony').data.ofWhat).rejects.toThrow(
			'does not exist',
		)
	})
})
