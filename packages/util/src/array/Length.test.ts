import { Assert, IsIdentical } from '~/type'
import type { Length } from './Length'

describe('Length', () => {
	it('simple', () => {
		expect.assertions(0)

		type A = Length<[]>
		Assert<IsIdentical<A, 0>>()

		type B = Length<readonly [1, 2]>
		Assert<IsIdentical<B, 2>>()
	})
})
