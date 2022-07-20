// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { Assert } from '../../type'
import type { PartialIfNullish, VPartial } from '../map'
import type { Merge2 } from './Merge2.js'

describe('Merge2', () => {
	type SomeType = { a: 1; b: 2 }

	it('generic', <T extends Partial<SomeType>>() => {
		expect.assertions(0)

		type A = Merge2<SomeType, Partial<SomeType>>
		Assert.is<A, SomeType>()

		type B = Merge2<SomeType, T>
		Assert.is<B, SomeType>()

		type C = Merge2<PartialIfNullish<SomeType>, T>
		Assert.is<C, SomeType>()

		type D = Merge2<SomeType, VPartial<T>>
		Assert.is<D, SomeType>()

		type E = Merge2<SomeType, T>
		Assert.is<E, SomeType>()

		// type F = Merge2<SomeType, null>
		// Assert.is<F, SomeType>()

		type G = Merge2<T, SomeType>
		Assert.is<G, SomeType>()
	})
})
