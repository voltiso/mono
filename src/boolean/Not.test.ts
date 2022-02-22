import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { Not } from './Not'

describe('not', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsCompatible<Not<true>, false>>()
		Assert<IsCompatible<Not<false>, true>>()
		Assert<IsCompatible<Not<boolean>, boolean>>()
	})
})
