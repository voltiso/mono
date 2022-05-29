/* eslint-disable no-magic-numbers */
import { Assert } from '../bdd'
import { CanBeUndefined } from './CanBeUndefined'

describe('canBeUndefined', () => {
	it('works', () => {
		expect.assertions(0)

		Assert.isSubtype<CanBeUndefined<{ x: 0; a: 1 }, 'a'>, false>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a: 1 | undefined }, 'a'>, true>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a?: 1 }, 'a'>, false>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a?: 1 | undefined }, 'a'>, true>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A = CanBeUndefined<{ a?: 1 }, 'a'>
		Assert.is<A, false>()

		type B = CanBeUndefined<T, 'a'>
		Assert.is<B, false>()
	})
})
