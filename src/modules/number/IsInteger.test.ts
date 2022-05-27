/* eslint-disable no-magic-numbers */
import { Assert, Is } from '../bdd/Assert'
import { IsInteger } from './IsInteger'

describe('number/IsNumberLiteral', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<
			IsInteger<123 | 444>
			//
		>(
			Is<IsInteger<123 | 444>>().true,
			Is<IsInteger<123 | 1.1>>().boolean,
			Is<IsInteger<'sdf'>>().false,
			Is<IsInteger<'sdf' | 1.1>>().false,
			Is<IsInteger<'sdf' | 1>>().boolean,
			Is<IsInteger<never>>().false,
			Is<IsInteger<unknown>>().boolean
			//
		)
	})
})
