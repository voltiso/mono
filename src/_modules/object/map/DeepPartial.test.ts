/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { DeepPartial } from './DeepPartial'

describe('DeepPartial', () => {
	it('works', () => {
		expect.assertions(0)
		type X = DeepPartial<{
			x: 0
			a: 1
			obj: {
				a: 11
			}
		}>
		Assert<
			IsIdentical<
				X,
				{
					x?: 0
					a?: 1
					obj?: {
						a?: 11
					}
				}
			>
		>()
	})
})
