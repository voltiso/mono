// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	$CustomObject,
	CustomObject,
	InputType,
	IObject,
	ObjectOptions,
	OutputType,
	Schema,
} from '@voltiso/schemar.types'
import type { IsIdentical } from '@voltiso/util'
import { Assert, undef } from '@voltiso/util'

import * as s from '~'

describe('object', () => {
	it('generic', <O extends Partial<ObjectOptions>>() => {
		expect.assertions(0)

		Assert.is<CustomObject<O>, Schema>()
		Assert.is<$CustomObject<O>, IObject>()
	})

	it('type', () => {
		expect.assertions(0)

		const obj = s.object({
			a: s.number,
		})

		Assert.is<typeof obj, IObject>()
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

		Assert<IsIdentical<OutputType<typeof s.object>, object>>()

		const x = s.object({ a: s.number(1), b: s.number(2) })
		type X = OutputType<typeof x>
		Assert<IsIdentical<X, { a: 1; b: 2 }>>()
		type XX = InputType<typeof x>
		Assert<IsIdentical<XX, { a: 1; b: 2 }>>()

		const y = s.object({ a: s.number(1), b: s.number(2).optional })
		type Y = OutputType<typeof y>
		Assert<IsIdentical<Y, { a: 1; b?: 2 }>>()
		Assert<IsIdentical<InputType<typeof y>, { a: 1; b?: 2 | undefined }>>()

		const z = s.object({ a: s.number(1), b: s.number(2).strictOptional })
		type Z = OutputType<typeof z>
		Assert<IsIdentical<Z, { a: 1; b?: 2 }>>()
		Assert<IsIdentical<InputType<typeof z>, { a: 1; b?: 2 }>>()

		// () => s.object({ a: s.string.readonly })

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
			s.schema({ a: s.number.optional.readonly }).isValid({ a: undef }),
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

	it('Type', () => {
		expect.assertions(0)

		const x = s.object({
			a: s.number.default(2 as const),
		})

		type Out = typeof x.OutputType
		type In = typeof x.InputType
		Assert<IsIdentical<Out, { a: number }>>()
		Assert<IsIdentical<In, { a?: number | undefined }>>()

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
		type Y = OutputType<typeof y>

		Assert<
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

		type YY = InputType<typeof y>

		Assert<
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

		expect(s.schema({}).hasDefault).toBe(true)
		expect(s.infer({}).hasDefault).toBe(true)
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

		type Out = OutputType<typeof t>
		Assert<IsIdentical<Out, { a: { b: { c: number } } }>>()

		type In = InputType<typeof t>
		Assert<
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

	it('pricing agreement', () => {
		expect.hasAssertions()

		const currency = s.string('USD').or(s.string('PLN'))
		Assert<IsIdentical<OutputType<typeof currency>, 'USD' | 'PLN'>>()

		const pricingAgreement = {
			currency,
			bidLevel: s.integer.min(0),
			hourlyRateByBidLevel: s.array(s.number.min(0)),
			commission: s.number.min(0).max(1),
			def: s.number.default(123),
		}

		type PricingAgreement = OutputType<typeof pricingAgreement>

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
		).toThrow('.currency')

		expect(() =>
			s.schema(pricingAgreement).validate({
				currency: 'ASD',
				bidLevel: 0,
				hourlyRateByBidLevel: [],
				commission: 0.2,
			}),
		).toThrow(
			`[@voltiso/schemar] .currency should be one of ['USD', 'PLN'] (got 'ASD')`,
		)

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

	it('optional - accepts undefined', () => {
		expect.hasAssertions()

		const sTest = {
			/** Hey! */
			num: s.number.optional,
		}

		expect(s.schema(sTest).isValid({})).toBeTruthy()
		expect(s.schema(sTest).isValid({ num: 123 })).toBeTruthy()
		expect(s.schema(sTest).isFixable({ num: undef })).toBeTruthy()
		expect(s.schema(sTest).isValid({ num: undef })).toBeFalsy()
		expect(s.schema(sTest).isValid({ num: 'str' })).toBeFalsy()
	})
})
