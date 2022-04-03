/* eslint-disable @typescript-eslint/no-explicit-any */
import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { IsNumberLiteral } from './IsNumberLiteral'

describe('number/IsNumberLiteral', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsIdentical<IsNumberLiteral<123 | 444>, true>>()
		Assert<IsIdentical<IsNumberLiteral<123 | 'asd'>, boolean>>()
		Assert<IsIdentical<IsNumberLiteral<'asd'>, false>>()
		Assert<IsIdentical<IsNumberLiteral<number>, false>>()
		Assert<IsIdentical<IsNumberLiteral<number | string>, false>>()
		Assert<IsIdentical<IsNumberLiteral<number | 'sdf'>, false>>()
		Assert<IsIdentical<IsNumberLiteral<123 | string>, boolean>>()
		Assert<IsIdentical<IsNumberLiteral<never>, false>>()
		Assert<IsIdentical<IsNumberLiteral<any>, false>>()
	})
})
