// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, VOmit } from '@voltiso/util'
import { Assert } from '@voltiso/util'

import type { MergeProps, Props } from '../../react-types'

describe('Path', () => {
	it('generic', <P0 extends Props, P1 extends Props>() => {
		expect.assertions(0)

		// type A = Omit<P0, keyof P1>
		// Assert.is<A, Props>() // bad!

		type B = VOmit<P0, keyof P1>
		Assert.is<B, Props>()

		type C = VOmit<P0, keyof P1> & P1
		Assert.is<C, Props>()

		type F = _<P0>
		Assert.is<F, Props>()

		type I = _<P0 & P1>
		Assert.is<I, Props>()

		type J = _<P0 | P1>
		Assert.is<J, Props>()

		// type G = _<Omit<P0, 'a'>>
		// Assert.is<G, Props>() // bad!

		type H = _<VOmit<P0, 'a'>>
		Assert.is<H, Props>()

		// type D = _<VOmit<P0, keyof P1>>
		// Assert.is<D, Props>()

		// type E = _<VOmit<P0, keyof P1> & P1>
		// Assert.is<E, Props>()

		// type Z = Merge2Trivial<P0, P1>
		// Assert.is<Z, Props>()

		// type Y = Merge2<P0, P1>
		// Assert.is<Y, Props>()

		// type X = Merge2Simple<P0, P1>
		// Assert.is<X, Props>() // :(

		type R = MergeProps<P0, P1>
		Assert.is<R, Props>() // :)
	})
})