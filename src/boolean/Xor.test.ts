import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { Xor } from './Xor'

describe('xor', () => {
	it('works', () => {
		expect.assertions(0)

		Assert<IsCompatible<Xor<false, true>, true>>()
		Assert<IsCompatible<Xor<true, false>, true>>()
		Assert<IsCompatible<Xor<true, true>, false>>()
		Assert<IsCompatible<Xor<false, false>, false>>()

		Assert<IsCompatible<Xor<false, boolean>, boolean>>()
		Assert<IsCompatible<Xor<true, boolean>, boolean>>()
	})
})
