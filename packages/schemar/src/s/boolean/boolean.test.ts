// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetOutputType } from '../../GetType'
import type { IRootSchema } from '../../schema'
import * as s from '..'
import type { BooleanOptions } from './_/BooleanOptions.js'
import type { CustomBoolean } from './CustomBoolean.js'

describe('boolean', () => {
	it('generic', <O extends BooleanOptions>() => {
		expect.assertions(0)

		Assert.is<s.IBoolean<O>, s.IBoolean>()
		Assert.is<CustomBoolean<O>, s.IBoolean<O>>()
		Assert.is<CustomBoolean<O>, s.IBoolean>()
	})

	it('simple', () => {
		expect.hasAssertions()

		Assert.is<s.Boolean, IRootSchema>()

		const aa = s.boolean
		type Aa = typeof aa.Type
		Assert<IsIdentical<Aa, boolean>>()

		expect(s.boolean.extends(s.unknown)).toBeTruthy()
		expect(s.boolean.extends(s.boolean)).toBeTruthy()

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
