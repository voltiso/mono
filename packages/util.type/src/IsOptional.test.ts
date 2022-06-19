/* eslint-disable no-magic-numbers */
import type { IsOptional, IsOptional_ } from './IsOptional'
import { SimpleAssert } from './SimpleAssert'

describe('isOptional', () => {
	it('works', () => {
		expect.assertions(0)

		SimpleAssert<IsOptional<{ a?: 1; b: 2 }, 'a'>, true>()
		SimpleAssert<IsOptional<{ a: 1; b: 2 }, 'a'>, false>()
		SimpleAssert<IsOptional<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		SimpleAssert<IsOptional<{ a: 1 | undefined; b: 2 }, 'a'>, false>()

		SimpleAssert<IsOptional_<{ a?: 1; b: 2 }, 'a'>, true>()
		SimpleAssert<IsOptional_<{ a: 1; b: 2 }, 'a'>, false>()
		SimpleAssert<IsOptional_<{ a?: 1 | undefined; b: 2 }, 'a'>, true>()
		SimpleAssert<IsOptional_<{ a: 1 | undefined; b: 2 }, 'a'>, false>()
	})

	it('generics', <T extends { a?: 1 }>() => {
		expect.assertions(0)

		type A0 = IsOptional<{ a?: 1 }, 'a'>
		SimpleAssert<A0, true>()

		type A1 = IsOptional_<{ a?: 1 }, 'a'>
		SimpleAssert<A1, true>()

		//

		type B0 = IsOptional<T, 'a'>
		SimpleAssert<B0, true>()

		type B1 = IsOptional_<T, 'a'>
		SimpleAssert<B1, true>()
	})
})
