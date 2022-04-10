/* eslint-disable no-magic-numbers */
import { Assert, Is } from '../bdd/Assert'
import { Parity } from './Parity'

describe('list', () => {
	it('works', () => {
		expect.assertions(0)
		Assert(
			Is<Parity<[]>>()(0 as const),
			Is<Parity<readonly [0, 0, 0, 0]>>()(0 as const),
			Is<Parity<[0, 0, 0]>>()(1 as const),
			Is<Parity<Date>>()<never>(),
			Is<Parity<unknown[]>>()<0 | 1>(),
			Is<Parity<[0] | [0, 0, 0]>>()(1 as const),
			Is<Parity<[0] | [0, 0, 0, 0]>>()<0 | 1>()
		)
	})
})
