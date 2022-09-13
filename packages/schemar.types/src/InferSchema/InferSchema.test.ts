// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type {
	InferableObject,
	InferSchema,
	IObject,
	ISchema,
	Object,
	ObjectLike,
	SchemableObject,
	SchemableObjectLike,
	SchemaLike,
} from '~'

describe('InferSchema', () => {
	it('type', () => {
		expect.assertions(0)

		type A = InferSchema<InferableObject>
		Assert<IsIdentical<A, Object<InferableObject>>>()

		type B = InferSchema<ObjectLike>
		Assert<IsIdentical<B, IObject>>()

		type C = InferSchema<Object<InferableObject>>
		Assert<IsIdentical<C, Object<InferableObject>>>()

		type D = InferSchema<SchemableObject>
		Assert<IsIdentical<D, Object<InferableObject> | IObject>>()

		type E = InferSchema<SchemableObjectLike>
		Assert<IsIdentical<E, IObject>>()

		type F = InferSchema<SchemaLike>
		Assert<IsIdentical<F, ISchema>>
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('generic', <S extends InferableObjectLike>() => {
	// 	expect.assertions(0)

	// 	type A = InferSchema<S>
	// })
})
