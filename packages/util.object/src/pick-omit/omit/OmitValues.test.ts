import { Assert } from '../../../bdd'
import { IsIdentical } from '../../../misc/IsEqual'
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
