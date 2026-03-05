// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, IsIdentical, Override } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type {
	CustomIntersection,
	IIntersection,
	Input,
	IntersectionOptions,
	Output,
} from '~'
import * as s from '~'
import { isObjectSchema, SCHEMA_NAME } from '~'

describe('intersection', () => {
	it('generic', <O extends Partial<IntersectionOptions>>() => {
		type X = O extends any ? CustomIntersection<O> : never
		$Assert.is<X, IIntersection>()
		$Assert.is<CustomIntersection<O>, IIntersection>()
	})

	it('type - object', () => {
		type A = s.SchemarAnd<s.Object<{ a: 1 }>, s.Object<{ b: 2 }>>
		$Assert<IsIdentical<A, s.Object$<{ a: 1; b: 2 }>>>()

		type B = s.SchemarAnd<
			s.Object<{ a: 1 }>,
			_<s.Object<{ b: 2 }>> & { Output: { c: 1 } } // ! why `_`
		>
		$Assert<
			IsIdentical<
				B,
				s.CustomObject$<{
					Output: {
						a: 1
						b: 2
						c: 1
					}
					Input: {
						a: 1
						b: 2
					}
				}>
			>
		>()

		type C = s.SchemarAnd.GetObject<
			s.Object<{ c: 3 }>,
			Override<s.Object<{ b: 2 }>, { Output: { a: 1 } }>
		>

		$Assert<
			IsIdentical<
				C,
				s.CustomObject$<{
					Output: {
						c: 3
						a: 1
					}
					Input: {
						c: 3
						b: 2
					}
				}>
			>
		>()

		// type D = s.SchemarAnd.Object<
		// 	s.Object<{ a: 1 }>,
		// 	s.Object<{ b: 2 }> & { Output: { c: 1 } }
		// >
	})

	it('works', () => {
		expect.hasAssertions()

		const sn = s.and(s.string, s.number.or(s.string))
		type Sn = Output<typeof sn>
		$Assert<IsIdentical<Sn, string>>()
		$Assert<IsIdentical<Input<typeof sn>, string>>()

		const sn2 = s.string.and(s.number)
		type Sn2 = Output<typeof sn2>
		$Assert<IsIdentical<Sn2, never>>()
		$Assert<IsIdentical<Input<typeof sn2>, never>>()

		expect(s.number.and(123).isValid(123)).toBeTruthy()
		expect(s.number.and(123).isValid(2)).toBeFalsy()
		expect(s.number.and(undefined).isValid(123)).toBeFalsy()
	})

	it('object + nonNullish', () => {
		expect(s.object.and(s.nonNullish).isValid({})).toBeTruthy()
		expect(
			s.object({ str: s.string.optional }).and(s.nonNullish).isValid({}),
		).toBeTruthy()
	})

	it('object & object', () => {
		const a = s.object({ a: s.string }).and(s.object({ b: s.number }))
		$Assert<
			IsIdentical<
				typeof a,
				s.Object$<{
					a: string
					b: number
				}>
			>
		>()

		expect(isObjectSchema(a)).toBeTruthy()

		expect(a.validate({ a: 'a', b: 1 })).toStrictEqual({ a: 'a', b: 1 })
	})

	it('default callbacks', () => {
		const a = s
			.object({ a: 1 })
			.default(() => ({ a: 1 }))
			.and(s.object({ b: 2 }).default(() => ({ b: 2 })))

		expect(a[SCHEMA_NAME]).toBe('Object')

		expect(a.validate(undefined)).toStrictEqual({ a: 1, b: 2 })
	})

	it('default callbacks nested', () => {
		const a = s
			.object({ a: s.string.default(() => 'test') })
			.and(s.object({ b: s.number.default(() => 1) }))

		expect(a.validate({})).toStrictEqual({ a: 'test', b: 1 })
	})

	it('record & object', () => {
		const a = s.record(s.string, s.number).and(s.object({ a: 1 }))
		$Assert<
			IsIdentical<
				typeof a,
				s.Object$<{
					[x: string]: number
					a: number
				}>
			>
		>()

		expect(a[SCHEMA_NAME]).toBe('Object')

		expect(a.validate({ a: 1, b: 2 })).toStrictEqual({ a: 1, b: 2 })
	})

	it('unknown object & object', () => {
		const a = s.object.and(s.object({ a: 1 }))
		$Assert<
			IsIdentical<
				typeof a,
				s.Object$<{
					a: number
				}>
			>
		>()

		expect(a[SCHEMA_NAME]).toBe('Object')
	})

	it('unknown record & unknown record', () => {
		const a = s.record.and(s.record)
		$Assert<IsIdentical<typeof a, s.UnknownRecord$>>()

		expect(a[SCHEMA_NAME]).toBe('UnknownRecord')
	})

	it('record & unknown record', () => {
		const myRecord = s.record(s.string, s.number)
		$Assert<IsIdentical<typeof myRecord, s.Record$<s.String, s.Number>>>()

		type O = Output<typeof s.record>
		$Assert<
			IsIdentical<
				O,
				{
					[x: string]: unknown
					[x: number]: unknown
					[x: symbol]: unknown
				}
			>
		>()

		const a = s.record.and(myRecord)
		$Assert<
			IsIdentical<
				typeof a,
				s.Object$<{
					[x: string]: number
				}>
			>
		>()

		expect(a[SCHEMA_NAME]).toBe('Object')
	})
})
