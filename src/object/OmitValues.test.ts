import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { OmitValues } from './OmitValues'

describe('OmitValues', () => {
	it('works', () => {
		expect.assertions(0)

		type X = OmitValues<
			{
				num: number
				fff: never
				ggg?: never
			},
			undefined
		>

		Assert<IsIdentical<X, { num: number }>>()
	})
})
