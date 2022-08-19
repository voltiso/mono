// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import { afterCreateOrUpdate, method } from '~/decorators'
import type {
	DocConstructor,
	DTI,
	IDocConstructorNoBuilder,
	IDocTI,
} from '~/Doc'
import { Doc } from '~/Doc'
import type { IRef } from '~/Ref'
import * as ss from '~/schemas'

import type { InferFields } from './InferFields'

class Doctor extends Doc({
	public: {
		friend: ss.sStrongRef,
		optionalFriend: ss.sStrongRef.optional,
	},

	private: {
		specialty: s.string.optional,
		ofWhat: s.string.optional,
	},
}) {
	// declare friend: Ref<Doctor>
	// declare optionalFriend?: Ref<Doctor>

	@method
	async setSpecialty(specialty: string) {
		this.specialty = specialty
	}

	@afterCreateOrUpdate
	setOfWhat() {
		if (this.specialty === 'master') this.ofWhat = 'universe'
	}

	@method
	async good() {
		// await doctors(this.id).update({ specialty: 'fireman' })
		return true
	}
}

describe('InferFields', () => {
	it('overrides ref', () => {
		expect.assertions(0)
		// type F = InferFields<Doctor>
		// type X = F['public']['friend']
		// Assert<IsIdentical<X, s.DocRef>>()
	})

	it('overrides optional ref', () => {
		expect.assertions(0)

		Assert.is<typeof Doctor, IDocConstructorNoBuilder>()
		// type A = Doctor[DTI]['public']['optionalFriend']
		type F = InferFields<typeof Doctor>
		type X = F['public']['optionalFriend']
		Assert.is<X, s.Schema<IRef>['optional']>()
		// Assert<IsIdentical<X, SOptional<s.DocRef>>>()
	})

	it('does nothing if nothing to do', () => {
		expect.assertions(0)

		type Orig = typeof Doctor[DTI]['private']['specialty']
		type F = InferFields<typeof Doctor>
		type X = F['private']['specialty']
		Assert<IsIdentical<X, Orig>>()
	})

	it('result is assignable to IDocTI', <X extends DocConstructor>() => {
		expect.assertions(0)

		type XX = InferFields<X>
		Assert.is<XX, Omit<IDocTI, 'tag' | 'methods' | 'doc' | 'docInside'>>()
	})
})
