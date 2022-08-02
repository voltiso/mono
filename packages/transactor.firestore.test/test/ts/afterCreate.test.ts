// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import { createTransactor, Doc } from '@voltiso/transactor'

import { firestore, firestoreModule } from './common/firestore'

const db = createTransactor(firestore, firestoreModule)

class Doctor extends Doc.public({
	specialty: s.string.optional,
})
	.private({
		ofWhat: s.string.optional,
	})
	.afterCreate(function () {
		if (this.specialty === 'master') this.ofWhat = 'universe'
	}) {}

const doctors = db('doctorX').register(Doctor)

describe('afterCreate', function () {
	it('triggers on creation', async function () {
		expect.hasAssertions()

		await firestore.doc('doctorX/anthony').delete()

		await expect(
			// @ts-expect-error `ofWhat` is private
			doctors('anthony').set({ ofWhat: 'neurosurgery' }),
		).rejects.toThrow('ofWhat')
		await expect(doctors('anthony')).resolves.toBeNull()

		await doctors.add({
			id: 'anthony',
			specialty: 'master',
		})

		await expect(doctors('anthony').ofWhat).resolves.toBe('universe')
	})

	it('does not trigger on update', async function () {
		expect.hasAssertions()

		await firestore.doc('doctorX/anthony').delete()

		await doctors.add({
			id: 'anthony',
		})

		await expect(doctors('anthony').ofWhat).rejects.toThrow('does not exist')

		await doctors('anthony').update({
			specialty: 'master',
		})

		await expect(doctors('anthony').ofWhat).rejects.toThrow('does not exist')
	})
})
