// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert, $Is } from '@voltiso/util'

import type {
	BooleanOptions,
	CustomBoolean,
	CustomBoolean$,
	ImplicitInferSchema$,
	Output,
	Schema,
} from '~'
import { isBooleanSchema } from '~'
import * as s from '~'

describe('boolean', () => {
	it('generic', <O extends Partial<BooleanOptions>>() => {
		$Assert.is<CustomBoolean<O>, Schema>()
	})

	it('type', () => {
		const opt = s.boolean.optional
		$Assert<IsIdentical<typeof opt, CustomBoolean$<{ isOptional: true }>>>()
	})

	it('simple', () => {
		expect.hasAssertions()

		$Assert.is<s.Boolean, Schema>()

		const aa = s.boolean
		type Aa = typeof aa.Type
		$Assert<IsIdentical<Aa, boolean>>()
		$Assert.is<typeof aa, Schema<boolean>>()

		type X = ImplicitInferSchema$<123>['Output']
		$Assert<IsIdentical<X, 123>>()

		type BooleanSchema = Schema<boolean>
		$Assert.is<BooleanSchema, Schema<boolean>>()

		// Assert.is<
		// 	s.CustomSchema<{ Input: boolean; Output: boolean }>,
		// 	BooleanSchema
		// >()
		// Assert.is<
		// 	BooleanSchema,
		// 	s.CustomSchema<{ Input: boolean; Output: boolean }>
		// >()

		type NeverSchema = Schema<never>
		type NeverOut = NeverSchema['Output']
		$Assert<IsIdentical<NeverOut, never>>()
		// Assert.is<s.CustomSchema<{ Input: never; Output: never }>, NeverSchema>()
		// Assert.is<NeverSchema, s.CustomSchema<{ Input: never; Output: never }>>()

		// Assert.is<typeof aa, s.Schema<never>>()
		$Assert($Is<typeof aa>().not.subtypeOf<Schema<never>>())

		$Assert.is<typeof aa, Schema<boolean | string>>()

		expect(isBooleanSchema(s.boolean)).toBeTruthy()

		expect(s.boolean.extends(s.boolean)).toBeTruthy()
		expect(s.boolean.extends(s.unknown)).toBeTruthy()

		expect(s.boolean.extends(s.literal(true))).toBeFalsy()
		expect(s.boolean.extends(s.literal(false))).toBeFalsy()

		expect(s.boolean.extends(s.boolean(true))).toBeFalsy()
		expect(s.boolean.extends(s.boolean(false))).toBeFalsy()

		expect(s.boolean.extends(s.literal(true, false))).toBeTruthy()
		expect(s.boolean.extends(s.or(s.literal(true), false))).toBeTruthy()
		expect(s.boolean.extends(s.or(true, false))).toBeTruthy()
		expect(s.boolean.extends(s.or(true, true))).toBeFalsy()
		expect(s.boolean.extends(s.or(false, false))).toBeFalsy()

		expect(s.boolean(true).extends(s.boolean)).toBeTruthy()
		expect(s.boolean(true).extends(s.boolean(true, false))).toBeTruthy()
		expect(s.boolean(true).extends(s.boolean(true, true))).toBeTruthy()
		expect(s.boolean(true).extends(s.boolean(false))).toBeFalsy()
		expect(s.boolean(true).extends(s.boolean(false, false))).toBeFalsy()
		expect(s.boolean.extends(s.boolean(true, false))).toBeTruthy()
		expect(s.boolean.extends(s.boolean(true))).toBeFalsy()

		const a = s.boolean(false)
		type A = Output<typeof a>
		$Assert.is<A, false>()
	})

	it('optional', () => {
		const inferable = {
			b: s.boolean,
			bOpt: s.boolean.optional,
		}

		type X = Output<typeof inferable>
		$Assert<IsIdentical<X, { b: boolean; bOpt?: boolean }>>()
	})
})
