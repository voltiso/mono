// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import type { GetInputType, GetOutputType, GetType_, NumberOptions } from '~'
import * as s from '~'

describe('s.number', () => {
	it('generic', <_O extends Partial<NumberOptions>>() => {
		expect.assertions(0)

		//! too deep...
		// Assert.is<CustomNumber<O>, Schema>()
		// Assert.is<CustomNumber<O>, s.INumber>()
	})

	it('simple', () => {
		expect.hasAssertions()

		// @ts-expect-error protected
		;() => s.number._extends(0)

		// @ts-expect-error protected
		;() => s.number._getIssuesImpl(0)

		expect(s.number.extends(s.number)).toBeTruthy()
		expect(s.number.extends(s.string)).toBeFalsy()
		expect(s.number(123).extends(s.number)).toBeTruthy()
		expect(s.number(123).extends(s.number(123, 234))).toBeTruthy()
		expect(s.number(123, 234).extends(s.number(123, 234))).toBeTruthy()
		expect(s.number(123, 0).extends(s.number(123, 234))).toBeFalsy()

		type N = GetOutputType<typeof s.number>
		Assert<IsIdentical<N, number>>()

		const nl = s.number(123, 234)
		type NL = GetOutputType<typeof nl>
		Assert<IsIdentical<NL, 123 | 234>>()
		Assert<IsIdentical<GetInputType<typeof nl>, 123 | 234>>()

		type No = typeof s.number.optional.Type
		Assert<IsIdentical<No, number>>()

		type Nlo = typeof nl.optional.Type
		Assert<IsIdentical<Nlo, 123 | 234>>()
	})

	it('default', () => {
		expect.hasAssertions()

		// // @ts-expect-error cannot have both optional and default
		// ;() => s.number.optional.default(123)

		// // @ts-expect-error cannot have both optional and default
		// ;() => s.number.default(123).optional

		// @ts-expect-error cannot fix without default value
		;() => s.number.withFix(undef)

		//
		;() => s.number.optional.integer

		expect(s.number.optional.tryValidate(undef).value).toBeUndefined()
		expect(s.number.optional.tryValidate(undef).isValid).toBeFalsy()

		const n = s.number.default(123)

		expect(n.tryValidate(undef).value).toBe(123)

		type Out = GetType_<typeof n, { kind: 'out' }>
		type In = GetType_<typeof n, { kind: 'in' }>
		Assert<IsIdentical<Out, number>>()
		Assert<IsIdentical<In, number | undefined>>()
	})

	it('check', () => {
		expect.hasAssertions()

		expect(s.number.isValid(123)).toBeTruthy()
		expect(s.number.isValid('123')).toBeFalsy()

		expect(s.number(123, 234).isValid(1)).toBeFalsy()
		expect(s.number(123, 234).isValid(123)).toBeTruthy()
		expect(s.number(123, 234).isValid('123')).toBeFalsy()
	})

	it('integer', () => {
		expect.hasAssertions()

		// // @ts-expect-error cannot call `integer` twice
		// ;() => s.number.integer.integer

		// @ts-expect-error cannot call `min` twice
		;() => s.number.min.min

		// @ts-expect-error cannot call `max` twice
		;() => s.number.max.max

		expect(s.number.integer.isValid(123)).toBeTruthy()
		expect(s.number.integer.isValid(1.23)).toBeFalsy()

		expect(() => s.number.min(123).validate(12)).toThrow('123')
		expect(() => s.number.min(123).max(999).validate(12)).toThrow('123')
		expect(() => s.number.min(123).max(999).validate(1000)).toThrow('999')
		expect(() => s.number.max(999).validate(1000)).toThrow('999')
	})

	it('toString', () => {
		expect.hasAssertions()

		expect(s.number.toString()).toBe('number')
		expect(s.number(1, 2, 3).toString()).toBe('1 | 2 | 3')
	})
})
