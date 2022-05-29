/* eslint-disable no-magic-numbers */
import { Assert } from '../bdd'
import { IsOptional } from './IsOptional'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)
		Assert.isSubtype<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		Assert.isSubtype<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A = IsOptional<{ a?: 1 }, 'a'>
		Assert.is<A, true>()

		type B = IsOptional<T, 'a'>
		Assert.is<B, true>()
	})
})
