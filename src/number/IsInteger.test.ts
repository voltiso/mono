import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { IsInteger } from './IsInteger'

describe('number/IsNumberLiteral', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsIdentical<IsInteger<123 | 444>, true>>()
		Assert<IsIdentical<IsInteger<123 | 1.1>, boolean>>()
		Assert<IsIdentical<IsInteger<123.6 | 1.1>, false>>()
		Assert<IsIdentical<IsInteger<'sdf'>, false>>()
		Assert<IsIdentical<IsInteger<'sdf' | 1.1>, false>>()
		Assert<IsIdentical<IsInteger<'sdf' | 1>, boolean>>()
		Assert<IsIdentical<IsInteger<never>, false>>()
		Assert<IsIdentical<IsInteger<unknown>, boolean>>()
	})
})
