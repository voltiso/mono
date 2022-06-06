/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { PickIndexSignatures } from './PickIndexSignatures'

describe('PickIndexSignatures', () => {
	it('works', () => {
		expect.assertions(0)

		type X = PickIndexSignatures<{
			new (x: number): number
			(x: number): number
			[k: string]: number
			[k: number]: 123
			[k: symbol]: 'asd'
			num: number
		}>
		Assert<
			IsIdentical<
				X,
				{
					[k: string]: number
					[k: number]: 123
					[k: symbol]: 'asd'
				}
			>
		>()
	})
})
