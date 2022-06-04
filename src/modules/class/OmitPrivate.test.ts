/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../IsEqual'
import { Assert } from '../bdd'
import { OmitPrivate } from './OmitPrivate'

describe('OmitPrivate', () => {
	it('works', () => {
		expect.assertions(0)

		type A = OmitPrivate<{
			a: 1
			b?: 2
			c?: 3 | undefined
			readonly d: 4 | undefined

			_a: 1
			_b?: 2
			_c?: 3 | undefined
			_d: 4 | undefined

			get e(): 5
			get _e(): 5
		}>

		Assert<
			IsIdentical<
				A,
				{
					a: 1
					b?: 2
					c?: 3 | undefined
					readonly d: 4 | undefined
					get e(): 5
				}
			>
		>()
	})
})
