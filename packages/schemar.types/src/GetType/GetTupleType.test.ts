// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type * as s from '~'

describe('GetTupleType', () => {
	it('literal', () => {
		expect.assertions(0)

		type A = s.TupleType_<1[], { kind: 'out' }>
		Assert<IsIdentical<A, 1[]>>()

		type B = s.TupleType_<number[], { kind: 'out' }>
		Assert<IsIdentical<B, number[]>>()

		type C = s.TupleType_<(number | string)[], { kind: 'out' }>
		Assert<IsIdentical<C, (number | string)[]>>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = s.TupleType_<[s.Number, s.String], { kind: 'out' }>
		Assert<IsIdentical<A, [number, string]>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type A = s.TupleType_<s.InferableLiteral[], { kind: 'out' }>
		Assert<IsIdentical<A, s.InferableLiteral[]>>()

		type B = s.TupleType_<s.ISchema[], { kind: 'out' }>
		Assert<IsIdentical<B, unknown[]>>()

		type C = s.TupleType_<s.Schemable[], { kind: 'out' }>
		Assert<IsIdentical<C, unknown[]>>()

		type D = s.TupleType_<readonly s.Schemable[], { kind: 'out' }>
		Assert<IsIdentical<D, readonly unknown[]>>()
	})
})
