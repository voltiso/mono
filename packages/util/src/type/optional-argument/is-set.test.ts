// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UNSET } from '_'
import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { IsSet } from './is-set'

describe('OptionalArgument', () => {
	it('type', () => {
		expect.assertions(0)

		type A = IsSet<never>
		$Assert<IsIdentical<A, true>>()

		type B = IsSet<null>
		$Assert<IsIdentical<B, true>>()

		type C = IsSet<unknown>
		$Assert<IsIdentical<C, true>>()

		type D = IsSet<any>
		$Assert<IsIdentical<D, true>>()

		type E = IsSet<void>
		$Assert<IsIdentical<E, true>>()

		type F = IsSet<symbol>
		$Assert<IsIdentical<F, true>>()

		const sym = Symbol('sym')

		type G = IsSet<typeof sym>
		$Assert<IsIdentical<G, true>>()

		type H = IsSet<UNSET>
		$Assert<IsIdentical<H, false>>()

		type I = IsSet<null | UNSET>
		$Assert<IsIdentical<I, boolean>>()

		type J = IsSet<never | UNSET>
		$Assert<IsIdentical<J, false>>()

		type K = IsSet<void | UNSET>
		$Assert<IsIdentical<K, boolean>>()
	})

	it('generic - true', <X extends null>() => {
		expect.assertions(0)

		type A = IsSet<X>
		$Assert<A, true>()
		// Assert.is<true, A>()
		// Assert.is<A, false>()
		// Assert<IsIdentical<A, true>>()
	})

	it('generic - not provided (or never)', <X extends UNSET>() => {
		expect.assertions(0)

		type A = IsSet<X>
		$Assert.is<A, boolean>()
		// Assert.is<A, false>() // IsProvided<never> === true

		// Assert.is<false, A>()
		// Assert.is<A, false>()
		// Assert<IsIdentical<A, boolean>>()
	})

	it('generic - provided or not (null)', <X extends null | UNSET>() => {
		expect.assertions(0)

		type A = IsSet<X>
		$Assert.is<A, boolean>()
		// Assert.is<A, true>()
		// Assert.is<A, false>()
	})
})
