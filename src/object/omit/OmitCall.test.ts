import { Assert } from '../../assert'
import { IsIdentical } from '../../IsEqual'
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
