// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomUnion,
	InputType,
	IUnion,
	OutputType,
	UnionOptions,
} from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('union', () => {
	it('generic', <O extends Partial<UnionOptions>>() => {
		type X = O extends any ? CustomUnion<O> : never
		$Assert.is<X, IUnion>()
		$Assert.is<CustomUnion<O>, IUnion>()
	})

	it('works', () => {
		expect.hasAssertions()

		const sn = s.union(s.string, s.number)
		type Sn = OutputType<typeof sn>
		$Assert<IsIdentical<Sn, string | number>>()
		$Assert<IsIdentical<InputType<typeof sn>, string | number>>()

		const sn2 = s.string.or(s.number)
		type Sn2 = OutputType<typeof sn2>
		$Assert<IsIdentical<Sn2, string | number>>()
		$Assert<IsIdentical<InputType<typeof sn2>, string | number>>()

		const snb = s.union(sn, s.bigint)
		type Snb = OutputType<typeof snb>
		$Assert<IsIdentical<Snb, string | number | bigint>>()
		$Assert<IsIdentical<InputType<typeof snb>, string | number | bigint>>()

		expect(s.string.extends(s.string.or(s.number))).toBeTruthy()
		expect(s.string.or(s.number).extends(s.string.or(s.number))).toBeTruthy()
		expect(s.number.or(s.string).extends(s.string.or(s.number))).toBeTruthy()
		expect(s.string.or(s.number).extends(s.string)).toBeFalsy()

		expect(s.string.or(s.string).extends(s.string)).toBeTruthy()
		expect(s.string.or(s.string('asd')).extends(s.string)).toBeTruthy()
		expect(s.string('sdf').or(s.string('asd')).extends(s.string)).toBeTruthy()
	})

	it('fix', () => {
		expect.hasAssertions()

		const a = s.string.or(s.number).fix(x => x.toString())

		expect(a.validate(123)).toBe('123')
		expect(a.validate('123')).toBe('123')

		type In = typeof a.InputType
		type Out = typeof a.OutputType

		$Assert<IsIdentical<In, string | number>>()
		$Assert<IsIdentical<Out, string>>()
	})

	it('fix (maybe undefined)', () => {
		expect.hasAssertions()

		const a = s.string
			.or(s.number)
			.fix((x): string | void =>
				typeof x === 'number' ? x.toString() : undefined,
			)

		expect(a.validate(123)).toBe('123')
		expect(a.validate('123')).toBe('123')

		type In = typeof a.InputType
		type Out = typeof a.OutputType

		$Assert<IsIdentical<In, string | number>>()
		$Assert<IsIdentical<Out, string>>()
	})
})
