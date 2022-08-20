// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import * as s from '~'

import { infer } from './infer'

describe('getSchema', () => {
	it('works - static', () => {
		expect.assertions(0)

		Assert<IsIdentical<s.InferSchema<true>, s.Literal<true>>>()
		Assert<IsIdentical<s.InferSchema<false>, s.Literal<false>>>()
		// Assert<IsIdentical<GetSchema<boolean>, never>>()

		Assert<IsIdentical<s.InferSchema<123>, s.Literal<123>>>()
		// Assert<IsIdentical<GetSchema<number>, never>>()

		Assert<IsIdentical<s.InferSchema<'abc'>, s.Literal<'abc'>>>()
		// Assert<IsIdentical<GetSchema<string>, never>>()

		Assert<IsIdentical<s.InferSchema<12n>, s.Literal<12n>>>()
		// Assert<IsIdentical<GetSchema<bigint>, never>>()

		const sym = Symbol('sym')
		Assert<IsIdentical<s.InferSchema<typeof sym>, s.Literal<typeof sym>>>()
		// Assert<IsIdentical<GetSchema<symbol>, never>>()
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

		expect(infer(undef).extends(undef)).toBeTruthy()
		expect(infer(undef).extends(s.undefined)).toBeTruthy()
		expect(infer(s.undefined).extends(undef)).toBeTruthy()
		expect(infer(s.undefined).extends(s.undefined)).toBeTruthy()

		expect(infer(undef).extends(null)).toBeFalsy()
		expect(infer(null).extends(undef)).toBeFalsy()
	})

	it('no readonly tuples', () => {
		expect.hasAssertions()

		const a = infer([1, 2, s.number] as const)

		expect(a.extends(s.readonlyTuple)).toBeTruthy()
		expect(a.extends(s.tuple)).toBeTruthy()
	})
})
