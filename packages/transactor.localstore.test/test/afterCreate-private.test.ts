// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $assert } from '@voltiso/assertor'
import * as s from '@voltiso/schemar'
import { Doc } from '@voltiso/transactor'

import { createTransactor, database } from './common'

const db = createTransactor({ checkDecorators: false })

// type A = _<DocIdBrand<typeof AnyDoc>>

class Doctor extends Doc.with({
	id: s.string,

	public: {
		specialty: s.string.optional,
	},

	private: {
		ofWhat: s.string.optional,
	},
}).afterCreate(async function () {
	if (this.data.specialty === 'master') {
		await this.update({ ofWhat: 'universe' })
		$assert(this.data.ofWhat === 'universe', 'test')
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
			id: 'anthony' as never,
			specialty: 'master',
		})

		await expect(doctors('anthony').data.ofWhat).resolves.toBe('universe')
	})

	it('does not trigger on update', async function () {
		expect.hasAssertions()

		await database.doc('doctor/anthony').delete()

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
