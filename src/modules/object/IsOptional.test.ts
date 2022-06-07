/* eslint-disable no-magic-numbers */
import { Assert } from '../bdd'
import { IsOptional, IsOptional_ } from './IsOptional'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.isSubtype<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		Assert.isSubtype<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()

		Assert.isSubtype<IsOptional_<{ a?: 1; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional_<{ a: 1; b: 2 }, 'a'>, false>()
		Assert.isSubtype<IsOptional_<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		Assert.isSubtype<IsOptional_<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A0 = IsOptional<{ a?: 1 }, 'a'>
		Assert.is<A0, true>()

		type A1 = IsOptional_<{ a?: 1 }, 'a'>
		Assert.is<A1, true>()

		//

		type B0 = IsOptional<T, 'a'>
		Assert.is<B0, true>()

		type B1 = IsOptional_<T, 'a'>
		Assert<B1, true>()
	})
})
