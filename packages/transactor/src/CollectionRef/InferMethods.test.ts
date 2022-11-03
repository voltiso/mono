// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { afterCreateOrUpdate, method } from '~/decorators'
import { Doc } from '~/Doc'

import type { InferMethods } from './InferMethods'

class Doctor extends Doc.with({
	private: {
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	},
}) {
	@method
	async setSpecialty(specialty: string) {
		this.data.specialty = specialty
	}

	@afterCreateOrUpdate
	setOfWhat() {
		if (this.data.specialty === 'master') this.data.ofWhat = 'universe'
	}

	@method
	async good() {
		// await doctors(this.id).update({ specialty: 'fireman' })
		return true
	}
}

describe('InferMethods', () => {
	it('works', () => {
		expect.assertions(0)

		type M = InferMethods<Doctor>
		$Assert<
			IsIdentical<
				M,
				{
					setSpecialty: (specialty: string) => Promise<void>
					good: () => Promise<boolean>
				}
			>
		>()
	})
})
