// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor()

class Doctor extends Doc.public({
	specialty: s.string.optional,
})
	.private({
		ofWhat: s.string.optional,
	})
	.afterCreate(async function () {
		if (this.specialty === 'master') {
			await this.update({ ofWhat: 'universe' })
			$assert(this.ofWhat === 'universe', 'test')
		}
	}) {}

const doctors = db('doctor').register(Doctor)

describe('afterCreate - private update', function () {
	it('triggers on creation', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

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

		await database.doc('doctor/anthony').delete()

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
