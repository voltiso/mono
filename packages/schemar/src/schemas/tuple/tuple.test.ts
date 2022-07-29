// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { GetInputType, GetOutputType } from '../../GetType/index'
import * as s from '../index'
import type { TupleOptions } from './_/TupleOptions.js'
import type { CustomTuple } from './CustomTuple.js'
import type { ITuple } from './ITuple.js'

describe('array', () => {
	it('generic', <O extends TupleOptions>() => {
		expect.assertions(0)

		Assert.is<ITuple<O>, ITuple>()
		Assert.is<CustomTuple<O>, ITuple<O>>()
		Assert.is<CustomTuple<O>, ITuple>()
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

		type A = GetOutputType<typeof s.tuple>
		Assert<IsIdentical<A, unknown[]>>()
		Assert<IsIdentical<GetOutputType<typeof s.tuple>, unknown[]>>()

		Assert<
			IsIdentical<GetOutputType<typeof s.readonlyTuple>, readonly unknown[]>
		>()
		Assert<
			IsIdentical<GetInputType<typeof s.readonlyTuple>, readonly unknown[]>
		>()

		const roSimple = s.readonlyTuple()
		type RoSimple = GetOutputType<typeof roSimple>
		Assert<IsIdentical<RoSimple, readonly []>>()
		Assert<IsIdentical<GetOutputType<typeof roSimple>, readonly []>>()

		const t = s.tuple()
		Assert<IsIdentical<GetOutputType<typeof t>, []>>()
		Assert<IsIdentical<GetOutputType<typeof t>, []>>()

		const ts = s.tuple(s.string)
		Assert<IsIdentical<GetOutputType<typeof ts>, [string]>>()
		Assert<IsIdentical<GetOutputType<typeof ts>, [string]>>()

		const ro = ts.readonlyTuple
		type X = GetOutputType<typeof ro>
		Assert<IsIdentical<X, readonly [string]>>()
		Assert<IsIdentical<GetInputType<typeof ro>, readonly [string]>>()

		const ro2 = s.readonlyTuple(s.string)
		Assert<IsIdentical<GetOutputType<typeof ro2>, readonly [string]>>()
		Assert<IsIdentical<GetOutputType<typeof ro2>, readonly [string]>>()

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
