// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type * as s from '../custom-/index'
import type { InferableLiteral, IRootSchema, RootSchemable } from '../Schema/index'
import type { GetTupleType } from './GetTupleType.js'

describe('GetTupleType', () => {
	it('literal', () => {
		expect.assertions(0)

		type A = GetTupleType<1[], { kind: 'out' }>
		Assert<IsIdentical<A, 1[]>>()

		type B = GetTupleType<number[], { kind: 'out' }>
		Assert<IsIdentical<B, number[]>>()

		type C = GetTupleType<(number | string)[], { kind: 'out' }>
		Assert<IsIdentical<C, (number | string)[]>>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = GetTupleType<[s.Number, s.String], { kind: 'out' }>
		Assert<IsIdentical<A, [number, string]>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type A = GetTupleType<InferableLiteral[], { kind: 'out' }>
		Assert<IsIdentical<A, InferableLiteral[]>>()

		type B = GetTupleType<IRootSchema[], { kind: 'out' }>
		Assert<IsIdentical<B, unknown[]>>()

		type C = GetTupleType<RootSchemable[], { kind: 'out' }>
		Assert<IsIdentical<C, unknown[]>>()

		type D = GetTupleType<readonly RootSchemable[], { kind: 'out' }>
		Assert<IsIdentical<D, readonly unknown[]>>()
	})
})
