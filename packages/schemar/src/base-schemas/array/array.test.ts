// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Output_, Schema } from '~'
import { isArraySchema, schema } from '~'
import * as s from '~'

describe('array', () => {
	it('type', () => {
		const a = s.array(s.string).default([] as const)
		const b = s.array(s.string)

		$Assert<
			IsIdentical<
				typeof a,
				s.CustomArray<{
					hasDefault: true
					Output: string[]
					Input: string[]
				}>
			>
		>()

		$Assert<IsIdentical<typeof b, s.MutableArray$<s.String>>>()

		type AA = Output_<typeof a>
		$Assert<IsIdentical<AA, string[]>>()
		type BB = Output_<typeof b>
		$Assert<IsIdentical<BB, string[]>>()
	})

	it('simple', () => {
		expect.hasAssertions()

		$Assert.is<typeof s.array, Schema>()

		expect(isArraySchema(s.array)).toBeTruthy()
		expect(isArraySchema(s.readonlyArray)).toBeTruthy()
		expect(isArraySchema(s.array(s.number))).toBeTruthy()
		expect(isArraySchema(s.readonlyArray(s.string))).toBeTruthy()

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

		expect(s.array.extends(s.readonlyArray)).toBeTruthy()
		expect(s.readonlyArray.extends(s.array)).toBeFalsy()
		expect(s.readonlyArray.extends(s.readonlyArray.mutableArray)).toBeFalsy()

		expect(s.array(s.number).extends(s.readonlyArray)).toBeTruthy()
		expect(s.readonlyArray(s.number).extends(s.array)).toBeFalsy()

		expect(s.array.extends(s.array.readonlyArray)).toBeTruthy()
		expect(s.array.readonlyArray.extends(s.array)).toBeFalsy()

		expect(s.array(s.number).extends(s.array.readonlyArray)).toBeTruthy()
		expect(s.array(s.number).readonlyArray.extends(s.array)).toBeFalsy()

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
			schema({ a: s.array.optional }).isValid({ a: [1, 2, '3', 'asd'] }),
		).toBeTruthy()

		expect(schema({ a: s.array.optional }).isValid({})).toBeTruthy()

		expect(
			schema({ a: s.array(s.number).optional }).isValid({ a: [1, 2, 3] }),
		).toBeTruthy()

		expect(
			schema({ a: s.array(s.number).optional }).isValid({ a: [1, 2, '3'] }),
		).toBeFalsy()

		expect(
			schema({ a: s.array(s.number).optional }).isValid({ a: undefined }),
		).toBeFalsy()

		expect(schema({ a: s.array(s.number).optional }).isValid({})).toBeTruthy()
	})

	it('toString', () => {
		expect.hasAssertions()

		// eslint-disable-next-line @typescript-eslint/no-base-to-string, sonarjs/no-base-to-string
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

	// ! currently disabled typings for this
	// eslint-disable-next-line jest/no-commented-out-tests
	// it('AtLeast1 - type', () => {
	// 	const a = s.array(1).minLength(1)
	// 	type A = typeof a.Output
	// 	$Assert<IsIdentical<A, [1, ...1[]]>>()

	// 	const b = a.minLength(1)
	// 	type B = typeof b.Output
	// 	$Assert<IsIdentical<B, [1, ...1[]]>>()

	// 	const c = s.readonlyArray(3).minLength(1)
	// 	type C = typeof c.Output
	// 	$Assert<IsIdentical<C, readonly [3, ...3[]]>>()

	// 	const d = s.readonlyArray(3)
	// 	type D = typeof d.Output
	// 	$Assert<IsIdentical<D, readonly 3[]>>()
	// })
})
