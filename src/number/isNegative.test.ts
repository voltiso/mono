/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { IsNegative } from './IsNegative'

describe('number/IsNegative', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsIdentical<IsNegative<-123 | 444>, boolean>>()
		Assert<IsIdentical<IsNegative<-123 | 'sdf'>, boolean>>()
		Assert<IsIdentical<IsNegative<-123 | -33>, true>>()
		Assert<IsIdentical<IsNegative<123 | 33>, false>>()
		Assert<IsIdentical<IsNegative<123 | 33>, false>>()
		Assert<IsIdentical<IsNegative<'ggg'>, false>>()
		Assert<IsIdentical<IsNegative<never>, false>>()
		Assert<IsIdentical<IsNegative<number>, boolean>>()
		Assert<IsIdentical<IsNegative<unknown>, boolean>>()
		Assert<IsIdentical<IsNegative<any>, boolean>>()
	})
})
