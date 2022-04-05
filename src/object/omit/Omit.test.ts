import { Assert } from '../../assert'
import { IsIdentical } from '../../IsEqual'
import { StrictOmit } from './Omit'

describe('Omit', () => {
	it('works', () => {
		expect.assertions(0)
		type X = StrictOmit<
			{
				a: string
				b: number
			},
			'a'
		>
		Assert<IsIdentical<X, { b: number }>>()
	})
})
