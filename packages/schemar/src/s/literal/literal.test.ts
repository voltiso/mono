// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import type { InferableLiteral, RootSchemable } from '../../schema'
import * as s from '..'
import type { LiteralOptions } from './_/LiteralOptions.js'
import type { CustomLiteral } from './CustomLiteral.js'
import type { ILiteral } from './ILiteral.js'

describe('s.literal', () => {
	it('generic', <O extends LiteralOptions>() => {
		expect.assertions(0)

		Assert.is<s.ILiteral<O>, ILiteral>()
		Assert.is<CustomLiteral<O>, ILiteral<O>>()
		Assert.is<CustomLiteral<O>, ILiteral>()

		type A = s.ILiteral<O>['OutputType']
		Assert.is<A, InferableLiteral>()
	})

	it('type', () => {
		expect.assertions(0)

		Assert.is<typeof s.literal, RootSchemable>()

		const a = s.literal
		type A = typeof a.OutputType
		Assert<IsIdentical<A, InferableLiteral>>()

		const b = s.literal(123)
		type B = typeof b.OutputType
		Assert<IsIdentical<B, 123>>()

		const c = s.literal(123).optional
		type C = typeof c.OutputType
		Assert<IsIdentical<C, 123>>()
	})

	it('simple', () => {
		expect.hasAssertions()

		expect(s.literal.extends(s.literal)).toBeTruthy()
		expect(s.literal.extends(123)).toBeFalsy()

		expect(s.literal.extends(s.boolean)).toBeFalsy()
		expect(s.literal(true).extends(s.boolean)).toBeTruthy()

		expect(s.literal(123).extends(s.literal)).toBeTruthy()
		expect(s.schema(123).extends(s.literal)).toBeTruthy()

		expect(s.literal(123n).extends(s.literal)).toBeTruthy()
		expect(s.schema(123n).extends(s.literal)).toBeTruthy()

		expect(s.literal('a').extends(s.literal)).toBeTruthy()
		expect(s.schema('a').extends(s.literal)).toBeTruthy()

		expect(s.schema(s.boolean).extends(s.literal)).toBeTruthy()
		expect(s.schema(true).extends(s.literal)).toBeTruthy()
		expect(s.boolean(true).extends(s.literal)).toBeTruthy()
		expect(s.boolean.extends(s.literal)).toBeTruthy()
		expect(s.schema(true).extends(s.literal)).toBeTruthy()

		expect(s.literal(null).extends(s.literal)).toBeTruthy()
		expect(s.literal(undef).extends(s.literal)).toBeTruthy()

		expect(s.schema(null).extends(s.literal)).toBeTruthy()
		expect(s.schema(undef).extends(s.literal)).toBeTruthy()

		expect(s.undefined.extends(s.literal)).toBeTruthy()
		expect(s.null.extends(s.literal)).toBeTruthy()

		expect(s.literal.extends(s.unknown)).toBeTruthy()
		expect(s.literal(123).extends(s.unknown)).toBeTruthy()
		expect(s.literal(null).extends(s.unknown)).toBeTruthy()
		expect(s.literal(undef).extends(s.unknown)).toBeTruthy()
	})
})