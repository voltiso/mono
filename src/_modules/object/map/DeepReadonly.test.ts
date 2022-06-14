/* eslint-disable no-magic-numbers */
import { Assert } from '../../bdd'
import { IsIdentical } from '../../../IsEqual'
import { DeepReadonly } from './DeepReadonly'

describe('DeepReadonly', () => {
	it('works', () => {
		expect.assertions(0)
		type X = DeepReadonly<{
			x: 0
			a?: 1
			obj: {
				a?: 11
			}
		}>
		Assert<
			IsIdentical<
				X,
				{
					readonly x: 0
					readonly a?: 1
					readonly obj: {
						readonly a?: 11
					}
				}
			>
		>()
	})
})
