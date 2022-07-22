// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import type { GetOutputType, GetType_ } from '../../GetType'
import * as s from '..'

describe('number', () => {
	it('simple', () => {
		expect.hasAssertions()

		expect(s.bigint.extends(s.bigint)).toBeTruthy()
		expect(s.bigint.extends(s.string)).toBeFalsy()
		expect(s.bigint(123n).extends(s.bigint)).toBeTruthy()
		expect(s.bigint(123n).extends(s.bigint(123n, 234n))).toBeTruthy()
		expect(s.bigint(123n, 234n).extends(s.bigint(123n, 234n))).toBeTruthy()
		expect(s.bigint(123n, 0n).extends(s.bigint(123n, 234n))).toBeFalsy()

		type B = GetOutputType<typeof s.bigint>
		Assert<IsIdentical<B, bigint>>()

		const bl = s.bigint(123n, 234n)
		type BL = GetOutputType<typeof bl>
		Assert<IsIdentical<BL, 123n | 234n>>()
	})

	it('default', () => {
		expect.hasAssertions()

		// // @ts-expect-error cannot have both optional and default
		// ;() => s.bigint.optional.default(123)

		// // @ts-expect-error cannot have both optional and default
		// ;() => s.bigint.default(123).optional

		// @ts-expect-error cannot fix without default value
		;() => s.bigint.fix(undef)

		const n = s.bigint.default(123n as const)

		expect(n.tryValidate(undef).value).toBe(123n)

		Assert<IsIdentical<GetType_<typeof n, { kind: 'out' }>, bigint>>()
		Assert<IsIdentical<GetType_<typeof n, { kind: 'in' }>, bigint>>()
	})

	it('check', () => {
		expect.hasAssertions()

		expect(s.bigint.isValid(123n)).toBeTruthy()
		expect(s.bigint.isValid(123)).toBeFalsy()
		expect(s.bigint.isValid('123n')).toBeFalsy()
		expect(s.bigint.isValid('123')).toBeFalsy()

		expect(s.bigint(123n, 234n).isValid('123')).toBeFalsy()
		// expect(s.bigint(123n, 234n).isValid('123n')).toBeFalsy()
		// expect(s.bigint(123n, 234n).isValid(1n)).toBeFalsy()
		// expect(s.bigint(123n, 234n).isValid(123n)).toBeTruthy()
	})

	it('integer', () => {
		expect.hasAssertions()

		// // @ts-expect-error cannot call `min` twice
		// ;() => s.bigint.min.min

		// // @ts-expect-error cannot call `max` twice
		// ;() => s.bigint.max.max

		expect(() => s.bigint.validate(12)).toThrow('bigint')

		expect(() => s.bigint.min(123n).validate(12n)).toThrow('123')
		expect(() => s.bigint.min(123n).max(999n).validate(12n)).toThrow('123')
		expect(() => s.bigint.min(123n).max(999n).validate(1000n)).toThrow('999')
		expect(() => s.bigint.max(999n).validate(1000n)).toThrow('999')
	})

	it('toString', () => {
		expect.hasAssertions()

		expect(s.bigint.toString()).toBe('bigint')
		expect(s.bigint(1n, 2n, 3n).toString()).toBe('1n | 2n | 3n')
	})
})
