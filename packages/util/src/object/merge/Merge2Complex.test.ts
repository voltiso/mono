// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $PartialComplex_, PartialIfNullish } from '~'
import { $Assert } from '~/$strip'

import type { Merge2Complex } from './Merge2Complex'

describe('Merge2', () => {
	type SomeType = { a: 1; b: 2 }

	it('generic', <T extends Partial<SomeType>>() => {
		expect.assertions(0)

		type A = Merge2Complex<SomeType, Partial<SomeType>>
		$Assert.is<A, SomeType>()

		type B = Merge2Complex<SomeType, T>
		$Assert.is<B, SomeType>()

		type C = Merge2Complex<PartialIfNullish<SomeType>, T>
		$Assert.is<C, SomeType>()

		type D = Merge2Complex<SomeType, $PartialComplex_<T>>
		$Assert.is<D, SomeType>()

		type E = Merge2Complex<SomeType, T>
		$Assert.is<E, SomeType>()

		// type F = Merge2<SomeType, null>
		// Assert.is<F, SomeType>()

		type G = Merge2Complex<T, SomeType>
		$Assert.is<G, SomeType>()
	})
})
