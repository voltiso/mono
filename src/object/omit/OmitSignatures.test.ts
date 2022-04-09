import { Assert } from '../../bdd'
import { IsIdentical } from '../../IsEqual'
import { OmitSignatures } from './OmitSignatures'

describe('OmitSignatures', () => {
	it('works', () => {
		expect.assertions(0)
		type X = OmitSignatures<{
			new (x: number): number
			(x: number): number
			[k: string]: number
			num: number
		}>
		Assert<IsIdentical<X, { num: number }>>()
	})
})
