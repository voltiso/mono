// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'
import { describe, expect, it } from 'vitest'

import type {
	CustomObject,
	CustomString$,
	Input,
	IObject,
	ObjectOptions,
	Output,
	Schema,
} from '~'
import * as s from '~'

describe('object', () => {
	it('generic', <O extends Partial<ObjectOptions>>() => {
		$Assert.is<CustomObject<O>, Schema>()
	})

	it('type', () => {
		const obj = s.object({
			a: s.number,
		})

		$Assert.is<typeof obj, IObject>()
	})

	it('extends', () => {
		expect.hasAssertions()

		expect(s.object.extends(s.object)).toBeTruthy()
		expect(s.object({}).extends(s.object)).toBeTruthy()
		expect(s.object.extends(s.object({}))).toBeTruthy()

		expect(s.object({ a: s.number }).extends(s.object)).toBeTruthy()

		const asd = s.object({ a: s.number })

		expect(s.object.extends(asd)).toBeFalsy()
		expect(s.object.extends({ a: s.number })).toBeFalsy()

		expect(
			s.object({ a: s.number }).extends(s.object({ a: s.unknown })),
		).toBeTruthy()

		expect(
			s.object({ a: s.number }).extends(s.object({ a: s.number(123) })),
		).toBeFalsy()

		expect(
			s
				.object({ a: s.number, b: s.string })
				.extends(s.object({ a: s.number(123) })),
		).toBeFalsy()

		expect(
			s.object({ a: s.number, b: s.string }).extends(s.object({ a: s.number })),
		).toBeTruthy()

		expect(
			s.object({ a: s.number, b: s.string }).extends(s.object({ c: s.number })),
		).toBeFalsy()

		type A = Output<typeof s.object>
		$Assert<IsIdentical<A, object>>()
		// $Assert<IsIdentical<A, {}>>()

		const x = s.object({ a: s.number(1), b: s.number(2) })
		type X = Output<typeof x>
		$Assert<IsIdentical<X, { a: 1; b: 2 }>>()
		type XX = Input<typeof x>
		$Assert<IsIdentical<XX, { a: 1; b: 2 }>>()

		const y = s.object({ a: s.number(1), b: s.number(2).optional })
		type Y = Output<typeof y>
		$Assert<IsIdentical<Y, { a: 1; b?: 2 }>>()
		type YY = Input<typeof y>
		$Assert<IsIdentical<YY, { a: 1; b?: 2 | undefined }>>()

		const z = s.object({ a: s.number(1), b: s.number(2).strictOptional })
		type Z = Output<typeof z>
		$Assert<IsIdentical<Z, { a: 1; b?: 2 }>>()
		$Assert<IsIdentical<Input<typeof z>, { a: 1; b?: 2 }>>()

		// () => s.object({ a: s.string.readonly })

		expect(s.object.extends(s.string)).toBeFalsy()

		expect(
			s.schema({ a: 1, b: s.string }).extends({ a: s.number }),
		).toBeTruthy()
		expect(s.schema({ a: 1, b: s.never }).extends({ a: s.number })).toBeTruthy()
		expect(
			s.schema({ a: 1, b: undefined }).extends({ a: s.number }),
		).toBeTruthy()

		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: s.unknown }),
		).toBeFalsy()
		expect(s.schema({ a: 1 }).extends({ a: s.number, b: s.never })).toBeFalsy()
		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: undefined }),
		).toBeFalsy()
	})

	it('extends - optional', () => {
		expect.hasAssertions()

		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: s.string.optional }),
		).toBeTruthy()
		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: s.unknown.optional }),
		).toBeTruthy()
		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: s.never.optional }),
		).toBeTruthy()
		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: s.literal(true).optional }),
		).toBeTruthy()
	})

	it('extends - readonly', () => {
		expect.hasAssertions()

		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: s.string.readonly }),
		).toBeFalsy()
		expect(
			s.schema({ a: 1 }).extends({
				a: s.number,
				b: s.string.optional.readonly,
			}),
		).toBeTruthy()

		expect(
			s.schema({ a: s.schema(1).readonly }).extends({ a: s.number }),
		).toBeFalsy()

		expect(
			s.schema({ a: s.schema(1).readonly }).extends({ a: s.number.readonly }),
		).toBeTruthy()

		expect(
			s.schema({ a: s.schema(1).readonly }).extends({
				a: s.number.readonly.optional,
			}),
		).toBeTruthy()

		expect(
			s.schema({ a: s.schema(1).readonly.optional }).extends({
				a: s.number.readonly.optional,
			}),
		).toBeTruthy()

		expect(
			s.schema({ a: s.schema(1).optional }).extends({
				a: s.number.readonly.optional,
			}),
		).toBeTruthy()

		expect(
			s.schema({ a: s.schema(1).optional }).extends({ a: s.number.readonly }),
		).toBeFalsy()

		expect(
			s.schema({ a: s.schema(1).optional.readonly }).extends({
				a: s.number.optional,
			}),
		).toBeFalsy()
	})

	it('isValid', () => {
		expect.hasAssertions()
		expect(s.schema({ a: s.number }).isValid({ a: 1 })).toBeTruthy()
		expect(s.schema({ a: s.number }).isValid({})).toBeFalsy()
		expect(s.schema({ a: s.number }).isValid({ a: '1' })).toBeFalsy()
		expect(s.schema({ a: s.number }).isValid({ a: 1, b: 2 })).toBeFalsy()
		expect(s.schema({ a: s.number.optional }).isValid({ a: 1 })).toBeTruthy()

		expect(
			s.schema({ a: s.number.optional.readonly }).isValid({ a: 1 }),
		).toBeTruthy()

		expect(
			s.schema({ a: s.number.optional.readonly }).isValid({ a: undefined }),
		).toBeFalsy()

		expect(s.schema({ a: s.number.optional }).exec({}).issues).toStrictEqual([])

		expect(s.schema({ a: s.number.optional.readonly }).isValid({})).toBeTruthy()
	})

	it('defaults', () => {
		expect.hasAssertions()

		const x = s.schema({
			a: s.number.default(123),
		})

		expect(x.exec({}).value).toStrictEqual({ a: 123 })
	})

	it('default vs optional', () => {
		const sNested = s.object({
			b: s.string,
			c: s.number.default(123),
		})

		expect(sNested.hasDefault).toBeFalsy()
		expect(sNested.isOptional).toBeFalsy()
		expect(sNested.isStrictOptional).toBeFalsy()

		const mySchema = s.schema({
			a: sNested.optional,
		})

		const a = mySchema.validate({})

		expect(a).toStrictEqual({})

		//

		const sNotAutoDefaulted = s.object({
			a: s.string.default('asd'),
		})

		expect(sNotAutoDefaulted.hasDefault).toBeFalsy()
		expect(sNotAutoDefaulted.isOptional).toBeFalsy()
		expect(sNotAutoDefaulted.isStrictOptional).toBeFalsy()

		//

		const sAutoDefaulted = s.schema({
			a: s.string.default('asd'),
		})

		expect(sAutoDefaulted.hasDefault).toBeTruthy()
		expect(sAutoDefaulted.isOptional).toBeFalsy()
		expect(sAutoDefaulted.isStrictOptional).toBeFalsy()

		//

		const so = s.string.strictOptional

		expect(so.isStrictOptional).toBeTruthy()
		expect(so.isOptional).toBeTruthy()
		expect(so.hasDefault).toBeFalsy()

		const so2 = s.string.optional.strictOptional

		$Assert<
			IsIdentical<
				typeof so2,
				CustomString$<{
					isStrictOptional: true
				}>
			>
		>()

		expect(so2.isStrictOptional).toBeTruthy()
		expect(so2.isOptional).toBeTruthy()
		expect(so2.hasDefault).toBeFalsy()

		const so3 = s.string.default('test').optional.strictOptional

		expect(so3.isStrictOptional).toBeTruthy()
		expect(so3.isOptional).toBeTruthy()
		expect(so3.hasDefault).toBeFalsy()

		$Assert<
			IsIdentical<
				typeof so3,
				CustomString$<{
					isStrictOptional: true
					Output: string
				}>
			>
		>()

		//

		const o = s.string.optional

		expect(o.isStrictOptional).toBeFalsy()
		expect(o.isOptional).toBeTruthy()
		expect(o.hasDefault).toBeFalsy()

		const o2 = s.string.strictOptional.optional

		expect(o2.isStrictOptional).toBeFalsy()
		expect(o2.isOptional).toBeTruthy()
		expect(o2.hasDefault).toBeFalsy()

		const o3 = s.string.default('test').strictOptional.optional

		expect(o3.isStrictOptional).toBeFalsy()
		expect(o3.isOptional).toBeTruthy()
		expect(o3.hasDefault).toBeFalsy()

		$Assert<
			IsIdentical<
				typeof o3,
				CustomString$<{
					isOptional: true
					Output: string
				}>
			>
		>()

		//

		const d = s.string.default('test')

		expect(d.hasDefault).toBeTruthy()
		expect(d.isOptional).toBeFalsy()
		expect(d.isStrictOptional).toBeFalsy()

		const d2 = s.string.optional.default('test')

		expect(d2.hasDefault).toBeTruthy()
		expect(d2.isOptional).toBeFalsy()
		expect(d2.isStrictOptional).toBeFalsy()

		const d3 = s.string.strictOptional.optional.default('test')

		expect(d3.hasDefault).toBeTruthy()
		expect(d3.isOptional).toBeFalsy()
		expect(d3.isStrictOptional).toBeFalsy()

		$Assert<
			IsIdentical<
				typeof d3,
				CustomString$<{
					// default: 'test'
					hasDefault: true
					Output: string
				}>
			>
		>()
	})

	it('Type', () => {
		const x = s.object({
			a: s.number.default(2 as const),
		})

		type Out = typeof x.Output
		type In = typeof x.Input
		$Assert<IsIdentical<Out, { a: number }>>()
		$Assert<IsIdentical<In, { a?: number | undefined }>>()

		const y = s.schema({
			rd: s.string.readonly.default('asd'),
			r: s.string.readonly,
			d: s.string.default('asd'),
			str: s.string,
			o: s.string.optional,
			so: s.string.strictOptional,
			ro: s.string.readonly.optional,
			rso: s.string.readonly.strictOptional,
		})
		type Y = Output<typeof y>

		$Assert<
			IsIdentical<
				Y,
				{
					readonly rd: string
					readonly r: string
					d: string
					str: string
					o?: string
					so?: string
					readonly ro?: string
					readonly rso?: string
				}
			>
		>()

		type YY = Input<typeof y>

		$Assert<
			IsIdentical<
				YY,
				{
					readonly rd?: string | undefined
					readonly r: string
					d?: string | undefined
					str: string
					o?: string | undefined
					so?: string
					readonly ro?: string | undefined
					readonly rso?: string
				}
			>
		>()
	})

	it('no object auto-default', () => {
		expect.hasAssertions()

		expect(s.object({}).hasDefault).toBe(false)

		expect(s.schema({ a: s.number.optional }).hasDefault).toBe(true)
		expect(s.schema({ a: s.number }).hasDefault).toBe(false)

		expect(s.schema({}).hasDefault).toBe(false) // NonNullish schema
		expect(s.infer({}).hasDefault).toBe(false) // NonNullish schema

		expect(s.infer({ a: s.number.optional }).hasDefault).toBe(true)
		expect(s.infer({ a: s.number }).hasDefault).toBe(false)
	})

	it('nested', () => {
		expect.hasAssertions()

		const t = s.schema({
			a: {
				b: {
					c: s.number.default(11),
				},
			},
		})

		type Out = Output<typeof t>
		$Assert<IsIdentical<Out, { a: { b: { c: number } } }>>()

		type In = Input<typeof t>
		$Assert<
			IsIdentical<
				In,
				| {
						a?:
							| {
									b?:
										| {
												c?: number | undefined
										  }
										| undefined
							  }
							| undefined
				  }
				| undefined
			>
		>()

		expect(t.exec({}).value).toStrictEqual({ a: { b: { c: 11 } } })
		expect(t.exec(undefined).value).toStrictEqual({ a: { b: { c: 11 } } })
	})

	it('validate', () => {
		expect.hasAssertions()

		expect(() => s.object({ a: s.number }).validate({ a: 1, b: 123 })).toThrow(
			'.b should not be present (got 123)',
		)

		expect(() => s.schema({ a: s.number }).validate({ a: 1, b: 123 })).toThrow(
			'123',
		)

		expect(() =>
			s
				.schema({ displayName: s.string.minLength(1) })
				.validate({ displayName: '' }),
		).toThrow('.displayName should be of length at least 1 (got 0)')
	})

	it('optional - accepts undefined', () => {
		expect.hasAssertions()

		const sTest = {
			/** Hey! */
			num: s.number.optional,
		}

		expect(s.schema(sTest).isValid({})).toBeTruthy()
		expect(s.schema(sTest).isValid({ num: 123 })).toBeTruthy()
		expect(s.schema(sTest).isFixable({ num: undefined })).toBeTruthy()
		expect(s.schema(sTest).isValid({ num: undefined })).toBeFalsy()
		expect(s.schema(sTest).isValid({ num: 'str' })).toBeFalsy()
	})
})
