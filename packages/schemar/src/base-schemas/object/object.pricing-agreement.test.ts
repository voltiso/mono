// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import type { IsIdentical } from '@voltiso/util'
import { $Assert } from '@voltiso/util'

import type { Output } from '~'
import * as s from '~'

describe('object', () => {
	it('pricing agreement', () => {
		expect.hasAssertions()

		const currency = s.string('USD').or(s.string('PLN'))

		type CurrencyB = typeof currency.Output
		$Assert<IsIdentical<CurrencyB, 'USD' | 'PLN'>>()

		type CurrencyA = Output<typeof currency>
		$Assert<IsIdentical<CurrencyA, 'USD' | 'PLN'>>()

		const pricingAgreement = {
			currency,
			bidLevel: s.integer.min(0),
			hourlyRateByBidLevel: s.array(s.number.min(0)),
			commission: s.number.min(0).max(1),
			def: s.number.default(123),
		}

		type PricingAgreement = Output<typeof pricingAgreement>

		$Assert<
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
		).toThrow(`.currency should be one of ['USD', 'PLN'] (got 'ASD')`)

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
				asd: undefined,
			}),
		).toThrow('.asd')
	})
})
