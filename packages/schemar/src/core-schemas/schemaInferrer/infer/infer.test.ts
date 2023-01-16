// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { InferSchema$, NonNullish$, Object$, String$ } from '~'
import * as s from '~'

import { infer } from './infer'

describe('getSchema', () => {
	it('type', () => {
		type A = InferSchema$<true>
		$Assert<IsIdentical<A, s.Literal$<true>>>()

		$Assert<IsIdentical<InferSchema$<false>, s.Literal$<false>>>()
		// Assert<IsIdentical<GetSchema<boolean>, never>>()

		$Assert<IsIdentical<InferSchema$<123>, s.Literal$<123>>>()
		// Assert<IsIdentical<GetSchema<number>, never>>()

		$Assert<IsIdentical<InferSchema$<'abc'>, s.Literal$<'abc'>>>()
		// Assert<IsIdentical<GetSchema<string>, never>>()

		$Assert<IsIdentical<InferSchema$<12n>, s.Literal$<12n>>>()
		// Assert<IsIdentical<GetSchema<bigint>, never>>()

		const sym = Symbol('sym')
		$Assert<IsIdentical<InferSchema$<typeof sym>, s.Literal$<typeof sym>>>()
		// Assert<IsIdentical<GetSchema<symbol>, never>>()
	})

	it('type - object', () => {
		type A = InferSchema$<{}>
		$Assert<IsIdentical<A, NonNullish$>>()

		type B = InferSchema$<{ a: 1 }>
		$Assert<IsIdentical<B, Object$<{ a: 1 }>>>()

		// type C = InferSchema$<s.String>
		// $Assert<IsIdentical<C, String$>>() // TODO

		type D = InferSchema$<String$>
		$Assert<IsIdentical<D, String$>>()

		type E = InferSchema$<{ a: String$ }>
		$Assert<IsIdentical<E, Object$<{ a: string }>>>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(infer(true).extends(true)).toBeTruthy()
		expect(infer(true).extends(s.literal(true))).toBeTruthy()
		expect(s.literal(true).extends(s.literal(true))).toBeTruthy()

		expect(infer(true).extends(s.boolean)).toBeTruthy()

		expect(infer(false).extends(false)).toBeTruthy()
		expect(infer(false).extends(s.literal(false))).toBeTruthy()
		expect(s.literal(false).extends(s.literal(false))).toBeTruthy()

		expect(infer(123).extends(123)).toBeTruthy()
		expect(infer(123).extends(s.literal(123))).toBeTruthy()
		expect(s.literal(123).extends(123)).toBeTruthy()

		expect(infer(null).extends(null)).toBeTruthy()
		expect(infer(null).extends(s.null)).toBeTruthy()
		expect(infer(s.null).extends(null)).toBeTruthy()
		expect(infer(s.null).extends(s.null)).toBeTruthy()

		expect(infer(undefined).extends(undefined)).toBeTruthy()
		expect(infer(undefined).extends(s.undefined)).toBeTruthy()
		expect(infer(s.undefined).extends(undefined)).toBeTruthy()
		expect(infer(s.undefined).extends(s.undefined)).toBeTruthy()

		expect(infer(undefined).extends(null)).toBeFalsy()
		expect(infer(null).extends(undefined)).toBeFalsy()
	})

	it('no readonly tuples', () => {
		expect.hasAssertions()

		const a = infer([1, 2, s.number] as const)

		expect(a.extends(s.readonlyTuple)).toBeTruthy()
		expect(a.extends(s.tuple)).toBeTruthy()
	})
})
