/* eslint-disable no-magic-numbers */
import { Assert, Is } from '../bdd/Assert'
import { Reverse } from './Reverse'

describe('array/Reverse', () => {
	it('works', () => {
		expect.assertions(0)
		Assert(
			Is<Reverse<readonly [1, 2, 3]>>() //
				.identicalTo<readonly [3, 2, 1]>(),

			Is<Reverse<[1, 2, 3]>>() //
				.identicalTo<[3, 2, 1]>(),

			Is<Reverse<[1, 2, 3, ...string[]]>>() //
				.identicalTo<[...string[], 3, 2, 1]>(),

			Is<Reverse<[...string[], 1, 2, 3]>>() //
				.identicalTo<[3, 2, 1, ...string[]]>(),

			Is<Reverse<[1, 2, 3, ...string[], 4, 5, 6]>>() //
				.identicalTo<[6, 5, 4, ...string[], 3, 2, 1]>()
		)
	})
})
