// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical, Printable } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { CustomUnion, Input, IUnion, Output, UnionOptions } from '~'
import * as s from '~'

describe('union', () => {
	it('generic', <O extends Partial<UnionOptions>>() => {
		type X = O extends any ? CustomUnion<O> : never
		$Assert.is<X, IUnion>()
		$Assert.is<CustomUnion<O>, IUnion>()
	})

	it('works', () => {
		expect.hasAssertions()

		const sn = s.or(s.string, s.number)
		type Sn = Output<typeof sn>
		$Assert<IsIdentical<Sn, string | number>>()
		$Assert<IsIdentical<Input<typeof sn>, string | number>>()

		const sn2 = s.string.or(s.number)
		type Sn2 = Output<typeof sn2>
		$Assert<IsIdentical<Sn2, string | number>>()
		$Assert<IsIdentical<Input<typeof sn2>, string | number>>()

		const snb = s.or(sn, s.bigint)
		type Snb = Output<typeof snb>
		$Assert<IsIdentical<Snb, string | number | bigint>>()
		$Assert<IsIdentical<Input<typeof snb>, string | number | bigint>>()

		expect(s.string.extends(s.string.or(s.number))).toBeTruthy()
		expect(s.string.or(s.number).extends(s.string.or(s.number))).toBeTruthy()
		expect(s.number.or(s.string).extends(s.string.or(s.number))).toBeTruthy()
		expect(s.string.or(s.number).extends(s.string)).toBeFalsy()

		expect(s.string.or(s.string).extends(s.string)).toBeTruthy()
		expect(s.string.or(s.string('asd')).extends(s.string)).toBeTruthy()
		expect(s.string('sdf').or(s.string('asd')).extends(s.string)).toBeTruthy()

		expect(s.number.or(undefined).isValid(undefined)).toBeTruthy()

		expect(s.number.or(undefined).isValid(undefined)).toBeTruthy()
	})

	it('fix', () => {
		expect.hasAssertions()

		const a = s.string.fix(s.number, x => x.toString())

		expect(a.validate(123)).toBe('123')
		expect(a.validate('123')).toBe('123')

		type In = typeof a.Input
		type Out = typeof a.Output

		$Assert<IsIdentical<In, string | number>>()
		$Assert<IsIdentical<Out, string>>()
	})

	it('fix without schema', () => {
		const a = s.string.fix<Printable>(String)
		$Assert<
			IsIdentical<
				typeof a,
				s.CustomString$<{
					Input: Printable
				}>
			>
		>()
	})

	it('map (maybe undefined)', () => {
		expect.hasAssertions()

		const a = s.string
			.or(s.number)
			.map(x => (typeof x === 'number' ? x.toString() : x))

		expect(a.validate(123)).toBe('123')
		expect(a.validate('123')).toBe('123')

		type In = typeof a.Input
		type Out = typeof a.Output

		$Assert<IsIdentical<In, string | number>>()
		$Assert<IsIdentical<Out, string>>()
	})
})
