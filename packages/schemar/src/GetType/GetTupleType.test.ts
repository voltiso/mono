// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type * as s from '~'

describe('GetTupleType', () => {
	it('literal', () => {
		expect.assertions(0)

		type A = s.GetTupleType_<1[], { kind: 'out' }>
		Assert<IsIdentical<A, 1[]>>()

		type B = s.GetTupleType_<number[], { kind: 'out' }>
		Assert<IsIdentical<B, number[]>>()

		type C = s.GetTupleType_<(number | string)[], { kind: 'out' }>
		Assert<IsIdentical<C, (number | string)[]>>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = s.GetTupleType_<[s.Number, s.String], { kind: 'out' }>
		Assert<IsIdentical<A, [number, string]>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type A = s.GetTupleType_<s.InferableLiteral[], { kind: 'out' }>
		Assert<IsIdentical<A, s.InferableLiteral[]>>()

		type B = s.GetTupleType_<s.ISchema[], { kind: 'out' }>
		Assert<IsIdentical<B, unknown[]>>()

		type C = s.GetTupleType_<s.Schemable[], { kind: 'out' }>
		Assert<IsIdentical<C, unknown[]>>()

		type D = s.GetTupleType_<readonly s.Schemable[], { kind: 'out' }>
		Assert<IsIdentical<D, readonly unknown[]>>()
	})
})
