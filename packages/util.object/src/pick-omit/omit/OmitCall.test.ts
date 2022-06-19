import { Assert } from '../../../bdd'
import { IsIdentical } from '../../../misc/IsEqual'
import { OmitCall } from './OmitCall'

describe('OmitCall', () => {
	it('works', () => {
		expect.assertions(0)
		type X = OmitCall<{
			new (x: number): number
			(x: number): number
			[k: string]: number
			num: number
		}>
		Assert<IsIdentical<X, { [k: string]: number; num: number }>>()
	})
})
