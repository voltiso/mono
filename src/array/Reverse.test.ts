import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { Reverse } from './Reverse'

describe('array/Reverse', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsIdentical<Reverse<readonly [1, 2, 3]>, readonly [3, 2, 1]>>()
		Assert<IsIdentical<Reverse<[1, 2, 3]>, [3, 2, 1]>>()
		Assert<IsIdentical<Reverse<[1, 2, 3, ...string[]]>, [...string[], 3, 2, 1]>>()
		Assert<IsIdentical<Reverse<[...string[], 1, 2, 3]>, [3, 2, 1, ...string[]]>>()
		Assert<IsIdentical<Reverse<[1, 2, 3, ...string[], 4, 5, 6]>, [6, 5, 4, ...string[], 3, 2, 1]>>()
	})
})
