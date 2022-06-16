import { Assert } from '../../../bdd'
import { IsIdentical } from '../../../../IsEqual'
import { PickCallNoUnknown } from './PickCall'

describe('PickCall', () => {
	it('PickCallNoUnknown', () => {
		expect.assertions(0)
		type X = PickCallNoUnknown<{
			new (x: number): string
			(x: number): number
			[k: string]: number
			num: number
		}>
		Assert<
			IsIdentical<
				X,
				{
					(x: number): number
				}
			>
		>()
	})
})
