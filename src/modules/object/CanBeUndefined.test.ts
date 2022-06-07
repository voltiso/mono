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

		Assert.isSubtype<CanBeUndefined<{ x: 0; a: 1 }, 'a'>, false>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a: 1 | undefined }, 'a'>, true>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a?: 1 }, 'a'>, false>()
		Assert.isSubtype<CanBeUndefined<{ x: 0; a?: 1 | undefined }, 'a'>, true>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A0 = CanBeUndefined<{ a?: 1 }, 'a'>
		Assert.is<A0, false>()

		type A1 = CanBeUndefined<{ a?: 1 }, 'a'>
		Assert.is<A1, false>()

		//

		type B0 = CanBeUndefined<T, 'a'>
		Assert.is<B0, false>()

		type B1 = CanBeUndefined<T, 'a'>
		Assert.is<B1, false>()
	})
})
