// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as s from '@voltiso/schemar'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import { afterCreateOrUpdate, method } from '~/decorators'
import type { DocTI, DTI } from '~/Doc'
import { Doc } from '~/Doc'
import type { $$DocConstructor, DocConstructor } from '~/DocConstructor'
import * as ss from '~/schemas'

import type { InferFields } from './InferFields'

class Doctor extends Doc.with({
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
		this.data.specialty = specialty
	}

	@afterCreateOrUpdate
	setOfWhat() {
		if (this.data.specialty === 'master') this.data.ofWhat = 'universe'
	}

	@method
	// eslint-disable-next-line @typescript-eslint/class-methods-use-this
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

		// $Assert.is<typeof Doctor, IDocConstructorNoBuilder>()
		$Assert.is<typeof Doctor, $$DocConstructor>()

		// type A = Doctor[DTI]['public']['optionalFriend']
		// type F = InferFields<typeof Doctor>
		// type X = F['public']['getShape']['optionalFriend']

		// $Assert.is<X, s.Schema$<CustomDocRef>['optional']>()
		// Assert<IsIdentical<X, SOptional<s.DocRef>>>()
	})

	it('does nothing if nothing to do', () => {
		expect.assertions(0)

		type Orig = (typeof Doctor)[DTI]['private']['getShape']['specialty']
		type F = InferFields<typeof Doctor>
		type X = F['private']['getShape']['specialty']
		$Assert<IsIdentical<X, Orig>>()
	})

	it('result is assignable to IDocTI', <X extends DocConstructor>() => {
		expect.assertions(0)

		type XX = InferFields<X>
		$Assert.is<XX, Omit<DocTI, 'tag' | 'methods' | 'doc' | 'docInside'>>()
	})
})
