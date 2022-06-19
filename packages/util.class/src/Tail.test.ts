/* eslint-disable no-magic-numbers */
import { Assert, Is } from '../bdd/Assert'
import { Tail } from './Tail'

describe('array/Tail', () => {
	it('works', () => {
		expect.assertions(0)
		Assert(
			Is<Tail<[1, 2, 3]>>() //
				.identicalTo<[2, 3]>(),

			Is<Tail<readonly [1, 2, 3]>>() //
				.identicalTo<readonly [2, 3]>()
		)
	})
})
