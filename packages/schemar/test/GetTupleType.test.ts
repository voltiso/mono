// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	InferableLiteral,
	Number as NumberSchema,
	Schema,
	Schemable,
	String as StringSchema,
	TupleType_,
} from '~'

describe('GetTupleType', () => {
	it('literal', () => {
		expect.assertions(0)

		type A = TupleType_<1[], { kind: 'out' }>
		$Assert<IsIdentical<A, 1[]>>()

		type B = TupleType_<number[], { kind: 'out' }>
		$Assert<IsIdentical<B, number[]>>()

		type C = TupleType_<(number | string)[], { kind: 'out' }>
		$Assert<IsIdentical<C, (number | string)[]>>()
	})

	it('type', () => {
		expect.assertions(0)

		type A = TupleType_<[NumberSchema, StringSchema], { kind: 'out' }>
		$Assert<IsIdentical<A, [number, string]>>()
	})

	it('generic', () => {
		expect.assertions(0)

		type A = TupleType_<InferableLiteral[], { kind: 'out' }>
		$Assert<IsIdentical<A, InferableLiteral[]>>()

		type B = TupleType_<Schema[], { kind: 'out' }>
		$Assert<IsIdentical<B, unknown[]>>()

		type C = TupleType_<Schemable[], { kind: 'out' }>
		$Assert<IsIdentical<C, unknown[]>>()

		type D = TupleType_<readonly Schemable[], { kind: 'out' }>
		$Assert<IsIdentical<D, readonly unknown[]>>()
	})
})
