import { Assert, Is } from '../bdd/Assert'
import { Not } from './Not'

describe('not', () => {
	it('works', () => {
		expect.assertions(0)
		Assert(
			Is<Not<true>>() //
				.identicalTo<false>(),

			Is<Not<false>>() //
				.identicalTo<true>(),

			Is<Not<boolean>>() //
				.identicalTo<boolean>()
		)
	})
})
