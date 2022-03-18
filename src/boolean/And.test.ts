import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { And } from './And'

describe('and', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsCompatible<And<true, true>, true>>()
		Assert<IsCompatible<And<true, false>, false>>()
		Assert<IsCompatible<And<false, boolean>, false>>()
		Assert<IsCompatible<And<true, boolean>, boolean>>()
		Assert<IsCompatible<And<boolean, boolean>, boolean>>()
	})
})
