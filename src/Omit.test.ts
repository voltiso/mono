import { Assert } from './assert'
import { IsIdentical } from './IsEqual'
import { OmitCall, OmitSignatures } from './Omit'

describe('Omit', () => {
	it('OmitSignatures', () => {
		expect.assertions(0)
		type X = OmitSignatures<{
			new (x: number): number
			(x: number): number
			[k: string]: number
			num: number
		}>
		Assert<IsIdentical<X, { num: number }>>()
	})

	it('OmitCall', () => {
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
