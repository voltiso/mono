/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert, Is } from '../bdd'
import { IsNegative } from './IsNegative'

describe('number/IsNegative', () => {
	it('works', () => {
		expect.assertions(0)
		Assert(
			Is<IsNegative<-123 | 444>>().boolean,
			Is<IsNegative<-123 | 'sdf'>>().boolean,
			Is<IsNegative<-123 | -33>>().true,
			Is<IsNegative<123 | 33>>().false,
			Is<IsNegative<'ggg'>>().false,
			Is<IsNegative<never>>().false,
			Is<IsNegative<number>>().boolean,
			Is<IsNegative<unknown>>().boolean,
			Is<IsNegative<any>>().boolean
			//
		)
	})
})
