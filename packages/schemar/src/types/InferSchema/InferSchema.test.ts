// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	$$Object,
	$$Schema,
	$$SchemableObject,
	ImplicitInferSchema$,
	InferableObject,
	IObject$,
	Literal$,
	NonNullish$,
	Schema$,
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
		$Assert<IsIdentical<F, Schema$>>()

		type G = ImplicitInferSchema$<1 | 2 | 'a' | {}>
		$Assert<IsIdentical<G, Literal$<1 | 2 | 'a'> | NonNullish$>>()
	})
})
