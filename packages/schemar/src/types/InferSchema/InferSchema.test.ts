// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	$$Object,
	$$Schema,
	$$SchemableObject,
	InferableObject,
	ImplicitInferSchema$,
	IObject$,
	ISchema$,
	Literal$,
	NonNullish$,
	SchemableObject,
} from '~'

describe('InferSchema', () => {
	it('type', () => {
		expect.assertions(0)

		type A = ImplicitInferSchema$<InferableObject>
		$Assert<IsIdentical<A, IObject$>>()

		type B = ImplicitInferSchema$<$$Object>
		$Assert<IsIdentical<B, IObject$>>()

		// ! too deep - TODO
		// type C = InferSchema$<Object<InferableObject>>
		// $Assert<IsIdentical<C, Object<InferableObject>>>()

		type D = ImplicitInferSchema$<SchemableObject>
		$Assert<IsIdentical<D, IObject$>>()

		type E = ImplicitInferSchema$<$$SchemableObject>
		$Assert<IsIdentical<E, IObject$>>()

		type F = ImplicitInferSchema$<$$Schema>
		$Assert<IsIdentical<F, ISchema$>>()

		type G = ImplicitInferSchema$<1 | 2 | 'a' | {}>
		$Assert<IsIdentical<G, Literal$<1 | 2 | 'a'> | NonNullish$>>()
	})
})
