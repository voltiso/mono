// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import * as s from '~/schemas'

describe('getSchema', () => {
	it('works - static', () => {
		expect.assertions(0)

		Assert<IsIdentical<s.GetSchema<true>, s.Literal<true>>>()
		Assert<IsIdentical<s.GetSchema<false>, s.Literal<false>>>()
		// Assert<IsIdentical<GetSchema<boolean>, never>>()

		Assert<IsIdentical<s.GetSchema<123>, s.Literal<123>>>()
		// Assert<IsIdentical<GetSchema<number>, never>>()

		Assert<IsIdentical<s.GetSchema<'abc'>, s.Literal<'abc'>>>()
		// Assert<IsIdentical<GetSchema<string>, never>>()

		Assert<IsIdentical<s.GetSchema<12n>, s.Literal<12n>>>()
		// Assert<IsIdentical<GetSchema<bigint>, never>>()

		const sym = Symbol('sym')
		Assert<IsIdentical<s.GetSchema<typeof sym>, s.Literal<typeof sym>>>()
		// Assert<IsIdentical<GetSchema<symbol>, never>>()
	})

	it('works', () => {
		expect.hasAssertions()

		expect(s.getSchema(true).extends(true)).toBeTruthy()
		expect(s.getSchema(true).extends(s.literal(true))).toBeTruthy()
		expect(s.literal(true).extends(s.literal(true))).toBeTruthy()

		expect(s.getSchema(true).extends(s.boolean)).toBeTruthy()

		expect(s.getSchema(false).extends(false)).toBeTruthy()
		expect(s.getSchema(false).extends(s.literal(false))).toBeTruthy()
		expect(s.literal(false).extends(s.literal(false))).toBeTruthy()

		expect(s.getSchema(123).extends(123)).toBeTruthy()
		expect(s.getSchema(123).extends(s.literal(123))).toBeTruthy()
		expect(s.literal(123).extends(123)).toBeTruthy()

		expect(s.getSchema(null).extends(null)).toBeTruthy()
		expect(s.getSchema(null).extends(s.null)).toBeTruthy()
		expect(s.getSchema(s.null).extends(null)).toBeTruthy()
		expect(s.getSchema(s.null).extends(s.null)).toBeTruthy()

		expect(s.getSchema(undef).extends(undef)).toBeTruthy()
		expect(s.getSchema(undef).extends(s.undefined)).toBeTruthy()
		expect(s.getSchema(s.undefined).extends(undef)).toBeTruthy()
		expect(s.getSchema(s.undefined).extends(s.undefined)).toBeTruthy()

		expect(s.getSchema(undef).extends(null)).toBeFalsy()
		expect(s.getSchema(null).extends(undef)).toBeFalsy()
	})

	it('no readonly tuples', () => {
		expect.hasAssertions()

		const a = s.getSchema([1, 2, s.number] as const)

		expect(a.extends(s.readonlyTuple)).toBeTruthy()
		expect(a.extends(s.tuple)).toBeTruthy()
	})
})
