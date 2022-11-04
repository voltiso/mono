// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	ArrayOptions,
	CustomArray,
	IArray,
	IMutableArray,
	Input,
	ISchema,
	Output,
	Schema,
	Schemable,
} from '@voltiso/schemar.types'
import { isArray, isString } from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import * as s from '~'

describe('array', () => {
	it('generic', <O extends Partial<ArrayOptions>>() => {
		expect.assertions(0)

		$Assert.is<CustomArray<O>, IArray>()
	})

	it('type', () => {
		$Assert.is<IArray, ISchema>()

		$Assert.is<IArray, Schema>()

		const a = s.array(s.string.or(s.number))
		$Assert.is<typeof a, Schemable>()

		$Assert.is<typeof a, Schema<(string | number)[]>>()

		type A = typeof a.Output
		$Assert<IsIdentical<A, (string | number)[]>>()
	})

	it('type 2', () => {
		const a = s.array(s.number)
		type A = typeof a.Output
		$Assert<IsIdentical<A, number[]>>()

		const b = s.array(s.never)
		type B = typeof b.Output
		$Assert<IsIdentical<B, never[]>>()
	})

	it('interface type', () => {
		expect.assertions(0)

		type Out = IArray['Output']
		$Assert<IsIdentical<Out, readonly unknown[]>>()

		type In = IArray['Input']
		$Assert<IsIdentical<In, readonly unknown[] | undefined>>()
	})

	it('interface type - mutable', () => {
		expect.assertions(0)

		type Out = IMutableArray['Output']
		$Assert<IsIdentical<Out, unknown[]>>()

		type In = IMutableArray['Input']
		$Assert<IsIdentical<In, unknown[]>>()
	})

	it('simple', () => {
		expect.hasAssertions()

		$Assert.is<typeof s.array, Schema>()

		expect(isArray(s.array)).toBeTruthy()
		expect(isArray(s.readonlyArray)).toBeTruthy()
		expect(isArray(s.array(s.number))).toBeTruthy()
		expect(isArray(s.readonlyArray(s.string))).toBeTruthy()

		expect(s.array.extends(s.array)).toBeTruthy()
		expect(s.array.extends(s.unknown)).toBeTruthy()
		expect(s.array(s.number).extends(s.unknown)).toBeTruthy()
		expect(s.array(s.number).extends(s.array)).toBeTruthy()
		expect(s.array(s.number).extends(s.array(s.unknown))).toBeTruthy()
		expect(s.array(s.number(1, 2, 3)).extends(s.array(s.unknown))).toBeTruthy()
		expect(s.array(s.number(1, 2, 3)).extends(s.array(s.number))).toBeTruthy()
		expect(
			s.array(s.number(1, 2, 3)).extends(s.array(s.number(1, 2))),
		).toBeFalsy()

		expect(s.tuple.extends(s.array)).toBeTruthy()
		expect(s.readonlyTuple.extends(s.array)).toBeFalsy()
		expect(s.tuple.extends(s.readonlyArray)).toBeTruthy()

		// mutable s.array has .push()
		expect(s.array.extends(s.tuple)).toBeFalsy()
		expect(s.array.extends(s.readonlyTuple)).toBeFalsy()

		expect(s.readonlyTuple.extends(s.readonlyArray)).toBeTruthy()

		// readonly s.array is a readonly tuple (in contrast to mutables)
		expect(s.readonlyArray.extends(s.readonlyTuple)).toBeTruthy()

		expect(s.array.extends(s.tuple())).toBeFalsy()
		expect(s.array.extends(s.tuple(s.unknown))).toBeFalsy()

		expect(s.readonlyArray(s.string).extends(s.readonlyTuple())).toBeTruthy()
		expect(
			s.readonlyArray(s.string).extends(s.readonlyTuple(s.string, s.string)),
		).toBeTruthy()

		expect(
			s
				.readonlyArray(s.string('a'))
				.extends(s.readonlyTuple(s.string, s.string)),
		).toBeTruthy()

		expect(
			s.readonlyArray(s.string).extends(s.readonlyTuple(s.string, s.number)),
		).toBeFalsy()

		expect(
			s.array(s.string).extends(s.readonlyTuple(s.string, s.string)),
		).toBeFalsy()

		$Assert<IsIdentical<Output<typeof s.array>, unknown[]>>()
		$Assert<IsIdentical<Input<typeof s.array>, unknown[]>>()

		$Assert<IsIdentical<Output<typeof s.readonlyArray>, readonly unknown[]>>()

		$Assert<IsIdentical<Input<typeof s.readonlyArray>, readonly unknown[]>>()

		const an = s.array(s.number)
		$Assert<IsIdentical<Output<typeof an>, number[]>>()
		$Assert<IsIdentical<Input<typeof an>, number[]>>()

		const ro = s.readonlyArray(s.string)

		expect(isString(ro.getElementSchema)).toBeTruthy()

		type RoS = typeof ro.getElementSchema
		$Assert<IsIdentical<RoS, s.String>>()

		type Ro = Output<typeof ro>
		$Assert<IsIdentical<Ro, readonly string[]>>()
		$Assert<IsIdentical<Input<typeof ro>, readonly string[]>>()

		const ro2 = s.array(s.string).readonlyArray
		type Ro2 = Output<typeof ro2>
		$Assert<IsIdentical<Ro2, readonly string[]>>()
		$Assert<IsIdentical<Input<typeof ro2>, readonly string[]>>()

		// // @ts-expect-error cannot call readonlyArray twice
		// ;() => s.array(s.string).readonlyArray.readonlyArray

		expect(s.array.extends(s.readonlyArray)).toBeTruthy()
		expect(s.readonlyArray.extends(s.array)).toBeFalsy()
		expect(s.readonlyArray.extends(s.readonlyArray.mutableArray)).toBeFalsy()

		expect(s.array(s.number).extends(s.readonlyArray)).toBeTruthy()
		expect(s.readonlyArray(s.number).extends(s.array)).toBeFalsy()

		expect(s.array.extends(s.array.readonlyArray)).toBeTruthy()
		expect(s.array.readonlyArray.extends(s.array)).toBeFalsy()

		expect(s.array(s.number).extends(s.array.readonlyArray)).toBeTruthy()
		expect(s.array(s.number).readonlyArray.extends(s.array)).toBeFalsy()

		const anl = s.array(s.number(123, 234))
		$Assert<IsIdentical<Output<typeof anl>, (123 | 234)[]>>()
		$Assert<IsIdentical<Input<typeof anl>, (123 | 234)[]>>()

		$Assert.is<typeof s.array, ISchema>()
		$Assert.is<typeof s.readonlyArray, ISchema>()

		$Assert.is<typeof s.array, IArray>()
		$Assert.is<typeof an, IArray>()
		$Assert.is<typeof anl, IArray>()

		expect(
			s.readonlyArray(s.number(123)).extends(s.readonlyArray(s.number)),
		).toBeTruthy()

		expect(
			s.readonlyArray({ a: 1 }).extends(s.readonlyArray({ a: s.number })),
		).toBeTruthy()

		expect(
			s
				.readonlyArray({ a: 1, b: s.string })
				.extends(s.readonlyArray({ a: s.number })),
		).toBeTruthy()

		expect(
			s
				.readonlyArray({ a: 1, b: s.never })
				.extends(s.readonlyArray({ a: s.number })),
		).toBeTruthy()

		expect(
			s
				.readonlyArray({ a: 1 })
				.extends(s.readonlyArray({ a: s.number, b: s.string })),
		).toBeFalsy()

		expect(
			s
				.readonlyArray({ a: 1 })
				.extends(s.readonlyArray({ a: s.number, b: s.never })),
		).toBeFalsy()

		expect(
			s.readonlyArray({ a: 1 }).extends(s.readonlyArray({ a: s.string })),
		).toBeFalsy()

		expect(
			s.array({ a: 1 }).extends(s.readonlyArray({ a: s.number })),
		).toBeTruthy()

		expect(
			s.array({ a: 1, b: s.string }).extends(s.readonlyArray({ a: s.number })),
		).toBeTruthy()

		expect(
			s.array({ a: 1, b: s.never }).extends(s.readonlyArray({ a: s.number })),
		).toBeTruthy()

		expect(
			s.array({ a: 1 }).extends(s.readonlyArray({ a: s.number, b: s.string })),
		).toBeFalsy()

		expect(
			s.array({ a: 1 }).extends(s.readonlyArray({ a: s.number, b: s.never })),
		).toBeFalsy()

		expect(
			s.array({ a: 1 }).extends(s.readonlyArray({ a: s.string })),
		).toBeFalsy()

		expect(s.array({ a: 1 }).extends(s.array({ a: s.number }))).toBeTruthy()

		expect(
			s.array({ a: 1, b: s.string }).extends(s.array({ a: s.number })),
		).toBeTruthy()

		expect(
			s.array({ a: 1, b: s.never }).extends(s.array({ a: s.number })),
		).toBeTruthy()

		expect(
			s.array({ a: 1 }).extends(s.array({ a: s.number, b: s.string })),
		).toBeFalsy()

		expect(
			s.array({ a: 1 }).extends(s.array({ a: s.number, b: s.never })),
		).toBeFalsy()

		expect(s.array({ a: 1 }).extends(s.array({ a: s.string }))).toBeFalsy()

		expect(
			s.readonlyArray({ a: 1 }).extends(s.array({ a: s.number })),
		).toBeFalsy()

		expect(
			s.readonlyArray({ a: 1, b: s.string }).extends(s.array({ a: s.number })),
		).toBeFalsy()

		expect(
			s.readonlyArray({ a: 1, b: s.never }).extends(s.array({ a: s.number })),
		).toBeFalsy()
		expect(
			s.readonlyArray({ a: 1 }).extends(s.array({ a: s.number, b: s.string })),
		).toBeFalsy()
		expect(
			s.readonlyArray({ a: 1 }).extends(s.array({ a: s.number, b: s.never })),
		).toBeFalsy()
		expect(
			s.readonlyArray({ a: 1 }).extends(s.array({ a: s.string })),
		).toBeFalsy()

		expect(
			s.readonlyArray(123).mutableArray.extends(s.array(s.number)),
		).toBeTruthy()

		expect(s.readonlyArray(123).extends(s.array(s.number))).toBeFalsy()
	})

	it('isValid', () => {
		expect.hasAssertions()
		expect(s.array(s.number).isValid([1, 2, 3])).toBeTruthy()

		expect(s.array(s.number).isValid([1, 2, '3'])).toBeFalsy()
		expect(s.array(s.number).isValid(123)).toBeFalsy()
	})

	it('optional', () => {
		expect.hasAssertions()

		expect(s.array.isOptional).toBeFalsy()
		expect(
			s.schema({ a: s.array.optional }).isValid({ a: [1, 2, '3', 'asd'] }),
		).toBeTruthy()
		expect(s.schema({ a: s.array.optional }).isValid({})).toBeTruthy()

		expect(
			s.schema({ a: s.array(s.number).optional }).isValid({ a: [1, 2, 3] }),
		).toBeTruthy()
		expect(
			s.schema({ a: s.array(s.number).optional }).isValid({ a: [1, 2, '3'] }),
		).toBeFalsy()
		expect(
			s.schema({ a: s.array(s.number).optional }).isValid({ a: undefined }),
		).toBeFalsy()
		expect(s.schema({ a: s.array(s.number).optional }).isValid({})).toBeTruthy()
	})

	it('toString', () => {
		expect.hasAssertions()

		expect(s.array.getElementSchema.toString()).toBe('unknown')

		expect(s.array.toString()).toBe('unknown[]')
		expect(s.readonlyArray.toString()).toBe('readonly unknown[]')

		expect(s.readonlyArray(s.number).toString()).toBe('readonly number[]')
	})

	it('validate', () => {
		expect.hasAssertions()

		expect(() => s.array(s.number).validate('asd')).toThrow(
			`should be array (got 'asd')`,
		)

		expect(() => s.array(s.number).validate([1, 'asd'])).toThrow('asd')

		expect(() =>
			s
				.array({ displayName: s.string.minLength(1) })
				.validate([{ displayName: '' }]),
		).toThrow(`[0].displayName should be of length at least 1 (got 0)`)
	})

	it('AtLeast1 - type', () => {
		const a = s.array(1).minLength(1)
		type A = typeof a.Output
		$Assert<IsIdentical<A, [1, ...1[]]>>()

		const b = a.minLength(1)
		type B = typeof b.Output
		$Assert<IsIdentical<B, [1, ...1[]]>>()

		const c = s.readonlyArray(3).minLength(1)
		type C = typeof c.Output
		$Assert<IsIdentical<C, readonly [3, ...3[]]>>()

		const d = s.readonlyArray(3)
		type D = typeof d.Output
		$Assert<IsIdentical<D, readonly 3[]>>()
	})
})
