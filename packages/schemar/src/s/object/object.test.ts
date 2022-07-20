// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable max-lines */

import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import type { GetInputType, GetOutputType } from '../../GetType'
import type { IRootSchema, RootSchemable } from '../../schema'
import * as s from '..'
import type { ObjectOptions } from './_/ObjectOptions.js'
import type { CustomObject } from './CustomObject.js'

describe('object', () => {
	it('generic', <O extends ObjectOptions>() => {
		expect.assertions(0)

		Assert.is<s.IObject<O>, s.IObject>()
		Assert.is<CustomObject<O>, s.IObject<O>>()
		Assert.is<CustomObject<O>, s.IObject>()

		const obj = s.schema({
			a: s.number,
		})

		Assert.is<typeof obj, s.IObject>()
		Assert.is<typeof obj, IRootSchema>()
		Assert.is<typeof obj, RootSchemable>()
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

		Assert<IsIdentical<GetOutputType<typeof s.object>, object>>()

		const x = s.object({ a: s.number(1), b: s.number(2) })
		type X = GetOutputType<typeof x>
		Assert<IsIdentical<X, { a: 1; b: 2 }>>()
		type XX = GetInputType<typeof x>
		Assert<IsIdentical<XX, { a: 1; b: 2 }>>()

		const y = s.object({ a: s.number(1), b: s.number(2).optional })
		type Y = GetOutputType<typeof y>
		Assert<IsIdentical<Y, { a: 1; b?: 2 }>>()
		Assert<IsIdentical<GetInputType<typeof y>, { a: 1; b?: 2 }>>()

		//
		;() => s.object({ a: s.string.readonly })

		expect(s.object.extends(s.string)).toBeFalsy()

		expect(
			s.schema({ a: 1, b: s.string }).extends({ a: s.number }),
		).toBeTruthy()
		expect(s.schema({ a: 1, b: s.never }).extends({ a: s.number })).toBeTruthy()
		expect(s.schema({ a: 1, b: undef }).extends({ a: s.number })).toBeTruthy()

		expect(
			s.schema({ a: 1 }).extends({ a: s.number, b: s.unknown }),
		).toBeFalsy()
		expect(s.schema({ a: 1 }).extends({ a: s.number, b: s.never })).toBeFalsy()
		expect(s.schema({ a: 1 }).extends({ a: s.number, b: undef })).toBeFalsy()
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

	it('check', () => {
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
			s.schema({ a: s.number.optional.readonly }).isValid({ a: undef }),
		).toBeFalsy()

		expect(
			s.schema({ a: s.number.optional }).tryValidate({}).issues,
		).toStrictEqual([])

		expect(s.schema({ a: s.number.optional.readonly }).isValid({})).toBeTruthy()
	})

	it('defaults', () => {
		expect.hasAssertions()

		const x = s.schema({
			a: s.number.default(123),
		})

		expect(x.tryValidate({}).value).toStrictEqual({ a: 123 })
	})

	it('Type', () => {
		expect.assertions(0)

		const x = s.object({
			a: s.number.default(2 as const),
		})

		type Out = typeof x.OutputType
		type In = typeof x.InputType
		Assert<IsIdentical<Out, { a: number }>>()
		Assert<IsIdentical<In, { a?: number }>>()

		const y = s.schema({
			rd: s.string.readonly.default('asd'),
			r: s.string.readonly,
			d: s.string.default('asd'),
			str: s.string,
			o: s.string.optional,
			ro: s.string.readonly.optional,
		})
		type Y = GetOutputType<typeof y>

		Assert<
			IsIdentical<
				Y,
				{
					readonly rd: string
					readonly r: string
					d: string
					str: string
					o?: string
					readonly ro?: string
				}
			>
		>()

		type YY = GetInputType<typeof y>

		Assert<
			IsIdentical<
				YY,
				{
					readonly rd?: string
					readonly r: string
					d?: string
					str: string
					o?: string
					readonly ro?: string
				}
			>
		>()
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

		type T = GetOutputType<typeof t>
		Assert<IsIdentical<T, { a: { b: { c: number } } }>>()

		Assert<
			IsIdentical<GetInputType<typeof t>, { a?: { b?: { c?: number } } }>
		>()

		expect(t.tryValidate({}).value).toStrictEqual({ a: { b: { c: 11 } } })
	})

	it('validate', () => {
		expect.hasAssertions()

		expect(() => s.object({ a: s.number }).validate({ a: 1, b: 123 })).toThrow(
			'123',
		)

		expect(() => s.schema({ a: s.number }).validate({ a: 1, b: 123 })).toThrow(
			'123',
		)
	})

	it('pricing agreement', () => {
		expect.hasAssertions()

		const currency = s.string('USD').or(s.string('PLN'))
		Assert<IsIdentical<GetOutputType<typeof currency>, 'USD' | 'PLN'>>()

		const pricingAgreement = {
			currency,
			bidLevel: s.integer.min(0),
			hourlyRateByBidLevel: s.array(s.number.min(0)),
			commission: s.number.min(0).max(1),
			def: s.number.default(123),
		}

		type PricingAgreement = GetOutputType<typeof pricingAgreement>

		Assert<
			IsIdentical<
				PricingAgreement,
				{
					currency: 'USD' | 'PLN'
					bidLevel: number
					hourlyRateByBidLevel: number[]
					commission: number
					def: number
				}
			>
		>()

		expect(() =>
			s.schema(pricingAgreement).validate({
				bidLevel: 0,
				hourlyRateByBidLevel: [],
				commission: 0.2,
			}),
		).toThrow('USD')

		expect(() =>
			s.schema(pricingAgreement).validate({
				currency: 'ASD',
				bidLevel: 0,
				hourlyRateByBidLevel: [],
				commission: 0.2,
			}),
		).toThrow('USD')

		expect(
			s.schema(pricingAgreement).isValid({
				currency: 'USD',
				bidLevel: 0,
				hourlyRateByBidLevel: [],
				commission: 0.2,
				def: 0,
			}),
		).toBeTruthy()

		expect(
			s.schema(pricingAgreement).validate({
				currency: 'USD',
				bidLevel: 0,
				hourlyRateByBidLevel: [],
				commission: 0.2,
			}),
		).toStrictEqual({
			currency: 'USD',
			bidLevel: 0,
			hourlyRateByBidLevel: [],
			commission: 0.2,
			def: 123,
		})

		expect(() =>
			s.schema(pricingAgreement).validate({
				currency: 'USD',
				bidLevel: -1,
				hourlyRateByBidLevel: [],
				commission: 0.2,
			}),
		).toThrow('bidLevel')

		expect(() =>
			s.schema(pricingAgreement).validate({
				currency: 'PLN',
				bidLevel: 12,
				hourlyRateByBidLevel: [-1],
				commission: 0.2,
			}),
		).toThrow('.hourlyRateByBidLevel[0]')

		expect(() =>
			s.schema(pricingAgreement).validate({
				currency: 'PLN',
				bidLevel: 12,
				hourlyRateByBidLevel: [30],
				commission: 1.1,
			}),
		).toThrow('.commission')

		expect(() =>
			s.schema(pricingAgreement).validate({
				currency: 'PLN',
				bidLevel: 12,
				hourlyRateByBidLevel: [30],
				commission: 1,
				asd: undef,
			}),
		).toThrow('.asd')
	})

	it('partial', () => {
		expect.hasAssertions()

		const ss = s.schema({
			num: s.number.optional,
			str: s.string,
			bigint: s.bigint.optional,

			nested: {
				a: 1,
			},
		})

		const ps = s.schema(ss).partial

		expect(ps.validate({})).toStrictEqual({})
		expect(() => ss.validate({})).toThrow('.str')
		expect(() => ps.validate({ nested: {} })).toThrow('.nested.a')

		type Ps = GetOutputType<typeof ps>

		Assert<
			IsIdentical<
				Ps,
				{
					num?: number
					str?: string
					bigint?: bigint
					nested?: {
						a: number
					}
				}
			>
		>()
	})

	it('deepPartial', () => {
		expect.hasAssertions()

		const ss = s.schema({
			numDef: s.number.default(1),
			num: s.number.optional,
			str: s.string,
			bigint: s.bigint.optional,

			nested: {
				a: 1,
			},
		})

		const ps = s.schema(ss).deepPartial

		expect(ps.validate({})).toStrictEqual({ numDef: 1 })
		expect(ps.validate({ nested: {} })).toStrictEqual({
			numDef: 1,
			nested: {},
		})
		expect(() => ss.validate({})).toThrow('.str')

		Assert<
			IsIdentical<
				GetOutputType<typeof ps>,
				{
					num?: number
					numDef?: number
					str?: string
					bigint?: bigint
					nested?: {
						a?: number
					}
				}
			>
		>()
	})
})
