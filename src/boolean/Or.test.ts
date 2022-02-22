import { Assert } from '../assert'
import { IsCompatible } from '../IsEqual'
import { Or } from './Or'

describe('or', () => {
	it('works', () => {
		expect.assertions(0)
		Assert<IsCompatible<Or<true, true>, true>>()
		Assert<IsCompatible<Or<true, false>, true>>()
		Assert<IsCompatible<Or<false, boolean>, boolean>>()
		Assert<IsCompatible<Or<true, boolean>, true>>()
		Assert<IsCompatible<Or<boolean, boolean>, boolean>>()
	})
})
