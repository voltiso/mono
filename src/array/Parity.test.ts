import { Assert } from '../assert'
import { IsIdentical } from '../IsEqual'
import { Parity } from './Parity'

describe('list', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsIdentical<Parity<[]>, 0>>()
		Assert<IsIdentical<Parity<readonly [0, 0, 0, 0]>, 0>>()
		Assert<IsIdentical<Parity<[0, 0, 0]>, 1>>()
		Assert<IsIdentical<Parity<Date>, never>>()
		Assert<IsIdentical<Parity<unknown[]>, 0 | 1>>()
		Assert<IsIdentical<Parity<[0] | [0, 0, 0]>, 1>>()
		Assert<IsIdentical<Parity<[0] | [0, 0, 0, 0]>, 0 | 1>>()
	})
})
