import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { Tail } from './Tail'

describe('array/Tail', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsIdentical<Tail<[1, 2, 3]>, [2, 3]>>()
		Assert<IsIdentical<Tail<readonly [1, 2, 3]>, readonly [2, 3]>>()
	})
})
