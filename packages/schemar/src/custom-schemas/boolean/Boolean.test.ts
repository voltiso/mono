// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert, Is } from '@voltiso/util'

import type { GetOutputType, ISchema } from '~'
import * as s from '~'
import type { BooleanOptions, CustomBoolean } from '~/custom-schemas/index'

describe('boolean', () => {
	it('generic', <O extends Partial<BooleanOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomBoolean<O>, s.IBoolean>()
		Assert.is<CustomBoolean<O>, s.ISchema>()
	})

	// eslint-disable-next-line jest/no-commented-out-tests
	// it('type', () => {
	// 	expect.assertions(0)
	// })

	it('simple', () => {
		expect.hasAssertions()

		Assert.is<s.Boolean, ISchema>()

		const aa = s.boolean
		type Aa = typeof aa.Type
		Assert<IsIdentical<Aa, boolean>>()

		type BooleanSchema = s.Schema<boolean>
		// Assert.is<
		// 	s.CustomSchema<{ Input: boolean; Output: boolean }>,
		// 	BooleanSchema
		// >()
		// Assert.is<
		// 	BooleanSchema,
		// 	s.CustomSchema<{ Input: boolean; Output: boolean }>
		// >()

		type X = s.GetSchema<123>['OutputType']
		Assert<IsIdentical<X, 123>>()

		Assert.is<typeof aa, BooleanSchema>()

		type NeverSchema = s.Schema<never>
		type NeverOut = NeverSchema['OutputType']
		Assert<IsIdentical<NeverOut, never>>()
		// Assert.is<s.CustomSchema<{ Input: never; Output: never }>, NeverSchema>()
		// Assert.is<NeverSchema, s.CustomSchema<{ Input: never; Output: never }>>()

		// Assert.is<typeof aa, s.Schema<never>>()
		Assert(Is<typeof aa>().not.subtypeOf<s.Schema<never>>())

		Assert.is<typeof aa, s.Schema<boolean | string>>()

		expect(s.isBoolean(s.boolean)).toBeTruthy()

		expect(s.boolean.extends(s.boolean)).toBeTruthy()
		expect(s.boolean.extends(s.unknown)).toBeTruthy()

		expect(s.boolean.extends(s.literal(true))).toBeFalsy()
		expect(s.boolean.extends(s.literal(false))).toBeFalsy()

		expect(s.boolean.extends(s.boolean(true))).toBeFalsy()
		expect(s.boolean.extends(s.boolean(false))).toBeFalsy()

		expect(s.boolean.extends(s.literal(true, false))).toBeTruthy()
		expect(s.boolean.extends(s.union(s.literal(true), false))).toBeTruthy()
		expect(s.boolean.extends(s.union(true, false))).toBeTruthy()
		expect(s.boolean.extends(s.union(true, true))).toBeFalsy()
		expect(s.boolean.extends(s.union(false, false))).toBeFalsy()

		expect(s.boolean(true).extends(s.boolean)).toBeTruthy()
		expect(s.boolean(true).extends(s.boolean(true, false))).toBeTruthy()
		expect(s.boolean(true).extends(s.boolean(true, true))).toBeTruthy()
		expect(s.boolean(true).extends(s.boolean(false))).toBeFalsy()
		expect(s.boolean(true).extends(s.boolean(false, false))).toBeFalsy()
		expect(s.boolean.extends(s.boolean(true, false))).toBeTruthy()
		expect(s.boolean.extends(s.boolean(true))).toBeFalsy()

		const a = s.boolean(false)
		type A = GetOutputType<typeof a>
		Assert.is<A, false>()
	})

	it('optional', () => {
		expect.assertions(0)

		const inferable = {
			b: s.boolean,
			bOpt: s.boolean.optional,
		}

		type X = GetOutputType<typeof inferable>
		Assert<IsIdentical<X, { b: boolean; bOpt?: boolean }>>()
	})
})
