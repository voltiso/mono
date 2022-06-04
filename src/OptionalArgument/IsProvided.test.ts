/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-statements */
import { IsIdentical } from '../IsEqual'
import { Assert } from '../modules/bdd'
import { IsProvided } from './IsProvided'
import { NotProvided } from './OptionalArgument'

describe('OptionalArgument', () => {
	it('type', () => {
		expect.assertions(0)

		type A = IsProvided<never>
		Assert<IsIdentical<A, true>>()

		type B = IsProvided<null>
		Assert<IsIdentical<B, true>>()

		type C = IsProvided<unknown>
		Assert<IsIdentical<C, true>>()

		type D = IsProvided<any>
		Assert<IsIdentical<D, true>>()

		type E = IsProvided<void>
		Assert<IsIdentical<E, true>>()

		type F = IsProvided<symbol>
		Assert<IsIdentical<F, true>>()

		const sym = Symbol('sym')

		type G = IsProvided<typeof sym>
		Assert<IsIdentical<G, true>>()

		type H = IsProvided<NotProvided>
		Assert<IsIdentical<H, false>>()

		type I = IsProvided<null | NotProvided>
		Assert<IsIdentical<I, boolean>>()

		type J = IsProvided<never | NotProvided>
		Assert<IsIdentical<J, false>>()

		type K = IsProvided<void | NotProvided>
		Assert<IsIdentical<K, boolean>>()
	})

	it('generic - true', <X extends null>() => {
		expect.assertions(0)

		type A = IsProvided<X>
		Assert.is<A, true>()
		// Assert.is<true, A>()
		// Assert.is<A, false>()
		// Assert<IsIdentical<A, true>>()
	})

	it('generic - not provided (or never)', <X extends NotProvided>() => {
		expect.assertions(0)

		type A = IsProvided<X>
		Assert.is<A, boolean>()
		// Assert.is<A, false>() // IsProvided<never> === true

		// Assert.is<false, A>()
		// Assert.is<A, false>()
		// Assert<IsIdentical<A, boolean>>()
	})

	it('generic - provided or not (null)', <X extends null | NotProvided>() => {
		expect.assertions(0)

		type A = IsProvided<X>
		Assert.is<A, boolean>()
		// Assert.is<A, true>()
		// Assert.is<A, false>()
	})
})
