import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { Parity } from './Parity'

describe('list', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsCompatible<Parity<[]>, 0>>()
		Assert<IsCompatible<Parity<[0, 0, 0, 0]>, 0>>()
		Assert<IsCompatible<Parity<[0, 0, 0]>, 1>>()
		Assert<IsCompatible<Parity<Date>, never>>()
		Assert<IsCompatible<Parity<unknown[]>, 0 | 1>>()
		Assert<IsCompatible<Parity<[0] | [0, 0, 0]>, 1>>()
		Assert<IsCompatible<Parity<[0] | [0, 0, 0, 0]>, 0 | 1>>()
	})
})
