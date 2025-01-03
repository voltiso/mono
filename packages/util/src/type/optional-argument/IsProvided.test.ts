// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { IsProvided } from './IsProvided'
import type { NoArgument } from './OptionalArgument'

describe('OptionalArgument', () => {
	it('type', () => {
		expect.assertions(0)

		type A = IsProvided<never>
		$Assert<IsIdentical<A, true>>()

		type B = IsProvided<null>
		$Assert<IsIdentical<B, true>>()

		type C = IsProvided<unknown>
		$Assert<IsIdentical<C, true>>()

		type D = IsProvided<any>
		$Assert<IsIdentical<D, true>>()

		type E = IsProvided<void>
		$Assert<IsIdentical<E, true>>()

		type F = IsProvided<symbol>
		$Assert<IsIdentical<F, true>>()

		const sym = Symbol('sym')

		type G = IsProvided<typeof sym>
		$Assert<IsIdentical<G, true>>()

		type H = IsProvided<NoArgument>
		$Assert<IsIdentical<H, false>>()

		type I = IsProvided<null | NoArgument>
		$Assert<IsIdentical<I, boolean>>()

		type J = IsProvided<never | NoArgument>
		$Assert<IsIdentical<J, false>>()

		type K = IsProvided<void | NoArgument>
		$Assert<IsIdentical<K, boolean>>()
	})

	it('generic - true', <X extends null>() => {
		expect.assertions(0)

		type A = IsProvided<X>
		$Assert<A, true>()
		// Assert.is<true, A>()
		// Assert.is<A, false>()
		// Assert<IsIdentical<A, true>>()
	})

	it('generic - not provided (or never)', <X extends NoArgument>() => {
		expect.assertions(0)

		type A = IsProvided<X>
		$Assert.is<A, boolean>()
		// Assert.is<A, false>() // IsProvided<never> === true

		// Assert.is<false, A>()
		// Assert.is<A, false>()
		// Assert<IsIdentical<A, boolean>>()
	})

	it('generic - provided or not (null)', <X extends null | NoArgument>() => {
		expect.assertions(0)

		type A = IsProvided<X>
		$Assert.is<A, boolean>()
		// Assert.is<A, true>()
		// Assert.is<A, false>()
	})
})
