// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	$$Object,
	$$Schema,
	$$SchemableObject,
	AutoCreatedObject,
	InferableObject,
	InferSchema,
	IObject,
	ISchema,
	Literal,
	Object,
	SchemableObject,
} from '~'

describe('InferSchema', () => {
	it('type', () => {
		expect.assertions(0)

		type A = InferSchema<InferableObject>
		$Assert<IsIdentical<A, IObject>>()

		type B = InferSchema<$$Object>
		$Assert<IsIdentical<B, IObject>>()

		type C = InferSchema<Object<InferableObject>>
		$Assert<IsIdentical<C, Object<InferableObject>>>()

		type D = InferSchema<SchemableObject>
		$Assert<IsIdentical<D, IObject>>()

		type E = InferSchema<$$SchemableObject>
		$Assert<IsIdentical<E, IObject>>()

		type F = InferSchema<$$Schema>
		$Assert<IsIdentical<F, ISchema>>()

		type G = InferSchema<1 | 2 | 'a' | {}>
		$Assert<IsIdentical<G, Literal<1 | 2 | 'a'> | AutoCreatedObject<{}>>>
	})
})
