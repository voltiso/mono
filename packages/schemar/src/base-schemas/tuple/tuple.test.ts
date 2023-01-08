// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type {
	CustomTuple,
	IMutableTuple,
	Input,
	ISchema,
	ITuple,
	Output,
	TupleOptions,
} from '~'
import * as s from '~'

describe('array', () => {
	it('generic', <O extends Partial<TupleOptions>>() => {
		$Assert.is<CustomTuple<O>, ISchema>()
		$Assert.is<CustomTuple<O>, ITuple>()
	})

	it('type', () => {
		expect.assertions(0)

		type Out = ITuple['Output']
		$Assert<IsIdentical<Out, readonly unknown[]>>()

		type In = ITuple['Input']
		$Assert<IsIdentical<In, readonly unknown[] | undefined>>()
	})

	it('type - mutable', () => {
		expect.assertions(0)

		type Out = IMutableTuple['Output']
		$Assert<IsIdentical<Out, unknown[]>>()

		type In = IMutableTuple['Input']
		$Assert<IsIdentical<In, unknown[]>>()
	})

	it('length', () => {
		expect.hasAssertions()

		const a = s.tuple()

		expect(a.getLength).toBe(0)

		$Assert<IsIdentical<(typeof a)['getLength'], 0>>()

		const b = s.tuple(1, 2, 3)

		expect(b.getLength).toBe(3)

		$Assert<IsIdentical<(typeof b)['getLength'], 3>>()

		// @ts-expect-error unknownTuple does not have getLength
		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		;() => s.tuple.getLength
	})

	it('simple', () => {
		expect.hasAssertions()

		expect(s.tuple().extends(s.array)).toBeTruthy()
		expect(s.tuple(s.number, s.string).extends(s.array)).toBeTruthy()

		expect(
			s.tuple(s.number, s.string).extends(s.array(s.string.or(s.number))),
		).toBeTruthy()

		expect(s.tuple(s.number, s.string).extends(s.array(s.string))).toBeFalsy()
		expect(s.tuple(s.number).extends(s.array(s.string))).toBeFalsy()
		expect(s.array(s.number).extends(s.tuple(s.number))).toBeFalsy()

		expect(s.tuple(s.string).extends(s.array(s.string))).toBeTruthy()
		expect(s.tuple(s.string).extends(s.array(s.string('a')))).toBeFalsy()
		expect(s.tuple(s.string('a')).extends(s.array(s.string))).toBeTruthy()
		expect(s.readonlyTuple(s.string).extends(s.array(s.string))).toBeFalsy()

		expect(s.readonlyTuple(s.string).extends(s.tuple(s.string))).toBeFalsy()
		expect(s.tuple(s.string).extends(s.readonlyTuple(s.string))).toBeTruthy()

		expect(
			s.readonlyTuple(s.string('a')).extends(s.readonlyTuple(s.string)),
		).toBeTruthy()

		expect(s.readonlyTuple(s.string).extends(s.readonlyArray)).toBeTruthy()

		expect(s.readonlyTuple(s.string).extends(s.readonlyArray)).toBeTruthy()
		expect(
			s.readonlyTuple(s.string).extends(s.readonlyArray(s.string)),
		).toBeTruthy()

		expect(s.readonlyTuple(s.string).extends(s.array(s.string))).toBeFalsy()

		expect(
			s.readonlyTuple(s.string('a')).extends(s.array(s.string)),
		).toBeFalsy()

		expect(
			s.readonlyTuple(s.string).extends(s.readonlyArray(s.string)),
		).toBeTruthy()

		expect(s.tuple(s.string).extends(s.readonlyArray(s.string))).toBeTruthy()

		expect(s.tuple(s.string, s.number).extends(s.array)).toBeTruthy()

		expect(
			s.tuple(s.string, s.number).extends(s.array(s.string.or(s.number))),
		).toBeTruthy()

		expect(
			s
				.tuple(s.string, s.number, s.never)
				.extends(s.array(s.string.or(s.number))),
		).toBeTruthy()

		expect(
			s
				.tuple(s.string, s.number, s.never)
				.extends(s.array(s.string.or(s.number))),
		).toBeTruthy()

		expect(s.string.extends(s.tuple(s.string).or(s.string))).toBeTruthy()

		type A = Output<typeof s.tuple>
		$Assert<IsIdentical<A, unknown[]>>()
		$Assert<IsIdentical<Output<typeof s.tuple>, unknown[]>>()

		$Assert<IsIdentical<Output<typeof s.readonlyTuple>, readonly unknown[]>>()
		$Assert<IsIdentical<Input<typeof s.readonlyTuple>, readonly unknown[]>>()

		const roSimple = s.readonlyTuple()
		type RoSimple = Output<typeof roSimple>
		$Assert<IsIdentical<RoSimple, readonly []>>()
		$Assert<IsIdentical<Output<typeof roSimple>, readonly []>>()

		const t = s.tuple()
		$Assert<IsIdentical<Output<typeof t>, []>>()
		$Assert<IsIdentical<Output<typeof t>, []>>()

		const ts = s.tuple(s.string)
		$Assert<IsIdentical<Output<typeof ts>, [string]>>()
		$Assert<IsIdentical<Output<typeof ts>, [string]>>()

		const ro = ts.readonlyTuple
		type X = Output<typeof ro>
		$Assert<IsIdentical<X, readonly [string]>>()
		$Assert<IsIdentical<Input<typeof ro>, readonly [string]>>()

		const ro2 = s.readonlyTuple(s.string)
		$Assert<IsIdentical<Output<typeof ro2>, readonly [string]>>()
		$Assert<IsIdentical<Output<typeof ro2>, readonly [string]>>()

		expect(s.tuple(s.string).extends(s.array)).toBeTruthy()
		expect(s.tuple(s.string).extends(s.tuple(s.string))).toBeTruthy()
		expect(s.tuple(s.string('asd')).extends(s.tuple(s.string))).toBeTruthy()
		expect(s.tuple(s.string).extends(s.tuple(s.string('sdf')))).toBeFalsy()
	})

	it('check', () => {
		expect.hasAssertions()
		expect(s.tuple(s.number).isValid([1, 2, 3])).toBeFalsy()
		expect(s.tuple(s.number).isValid([])).toBeFalsy()
		expect(s.tuple(s.number, s.string).isValid([1, 2])).toBeFalsy()
		expect(s.tuple(s.number, s.string).isValid([1, '2'])).toBeTruthy()
		expect(s.tuple(s.number, s.string).isValid(123)).toBeFalsy()
		expect(s.tuple(s.number, s.string).isValid(['1', '2'])).toBeFalsy()

		expect(
			s.tuple(s.number, s.string).or(s.number).isValid([1, '2']),
		).toBeTruthy()

		expect(s.tuple(s.number, s.string).or(s.number).isValid(2)).toBeTruthy()
		expect(s.tuple(s.number, s.string).or(s.number).isValid('2')).toBeFalsy()
		expect(s.tuple(s.number, s.string).isValid('2')).toBeFalsy()

		const t0 = s.tuple(1, 2, s.number, s.rest(s.string))
		$Assert<IsIdentical<typeof t0.Type, [1, 2, number, ...string[]]>>()

		const t1 = s.tuple(1, 2, s.number, ...s.rest(s.string))
		$Assert<IsIdentical<typeof t1.Type, [1, 2, number, ...string[]]>>()

		expect(t0.isValid([1, 2, 33, 'x', '5'])).toBeTruthy()
		expect(t0.isValid([1, 2, 33, 'x', 66])).toBeFalsy()
	})

	it('validate', () => {
		expect.hasAssertions()

		expect(() => s.tuple(s.number.min(1)).validate(0)).toThrow(
			'Array.isArray should be true (got false)',
		)

		expect(() => s.tuple({ a: s.number.min(1) }).validate([{ a: 0 }])).toThrow(
			'[0].a should at least 1',
		)
	})
})
