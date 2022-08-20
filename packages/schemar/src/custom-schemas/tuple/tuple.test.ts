// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type {
	IMutableTuple,
	InputType,
	ITuple,
	OutputType,
	TupleOptions,
} from '~'
import * as s from '~'

describe('array', () => {
	it('generic', <_O extends Partial<TupleOptions>>() => {
		expect.assertions(0)

		//! too deep...
		// Assert.is<CustomTuple<O>, ITuple>()
	})

	it('type', () => {
		expect.assertions(0)

		type Out = ITuple['OutputType']
		Assert<IsIdentical<Out, readonly unknown[]>>()

		type In = ITuple['InputType']
		Assert<IsIdentical<In, readonly unknown[]>>()
	})

	it('type - mutable', () => {
		expect.assertions(0)

		type Out = IMutableTuple['OutputType']
		Assert<IsIdentical<Out, unknown[]>>()

		type In = IMutableTuple['InputType']
		Assert<IsIdentical<In, unknown[]>>()
	})

	it('length', () => {
		expect.hasAssertions()

		const a = s.tuple()

		expect(a.getLength).toBe(0)

		Assert<IsIdentical<typeof a['getLength'], 0>>()

		const b = s.tuple(1, 2, 3)

		expect(b.getLength).toBe(3)

		Assert<IsIdentical<typeof b['getLength'], 3>>()

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

		type A = OutputType<typeof s.tuple>
		Assert<IsIdentical<A, unknown[]>>()
		Assert<IsIdentical<OutputType<typeof s.tuple>, unknown[]>>()

		Assert<
			IsIdentical<OutputType<typeof s.readonlyTuple>, readonly unknown[]>
		>()
		Assert<IsIdentical<InputType<typeof s.readonlyTuple>, readonly unknown[]>>()

		const roSimple = s.readonlyTuple()
		type RoSimple = OutputType<typeof roSimple>
		Assert<IsIdentical<RoSimple, readonly []>>()
		Assert<IsIdentical<OutputType<typeof roSimple>, readonly []>>()

		const t = s.tuple()
		Assert<IsIdentical<OutputType<typeof t>, []>>()
		Assert<IsIdentical<OutputType<typeof t>, []>>()

		const ts = s.tuple(s.string)
		Assert<IsIdentical<OutputType<typeof ts>, [string]>>()
		Assert<IsIdentical<OutputType<typeof ts>, [string]>>()

		const ro = ts.readonlyTuple
		type X = OutputType<typeof ro>
		Assert<IsIdentical<X, readonly [string]>>()
		Assert<IsIdentical<InputType<typeof ro>, readonly [string]>>()

		const ro2 = s.readonlyTuple(s.string)
		Assert<IsIdentical<OutputType<typeof ro2>, readonly [string]>>()
		Assert<IsIdentical<OutputType<typeof ro2>, readonly [string]>>()

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
	})
})
