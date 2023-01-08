// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical, Merge2Nullish } from '~'
import { $Assert } from '~/$strip'

describe('Merge2Nullish', () => {
	type SomeType = {
		a: 1
		b: 2
	}

	it('type', () => {
		expect.assertions(0)

		type A = Merge2Nullish<{ a: 1 }, null>
		$Assert<IsIdentical<A, { a: 1 }>>()

		type B = Merge2Nullish<null, null>
		$Assert<IsIdentical<B, {}>>()

		type C = Merge2Nullish<null, { a: 1 }>
		$Assert<IsIdentical<C, { a: 1 }>>()

		type D = Merge2Nullish<{ a: 'a' } | null, { a: 'aa' } | null>
		$Assert<IsIdentical<D, { a?: 'a' | 'aa' }>>()

		type E = Merge2Nullish<{ a: 'a' }, { a: 'aa' } | null>
		$Assert<IsIdentical<E, { a: 'a' | 'aa' }>>()

		type F = Merge2Nullish<{ a?: 'a' } | undefined | null, { a: 'aa' }>
		$Assert<IsIdentical<F, { a: 'aa' }>>()

		type G = Merge2Nullish<SomeType, Partial<SomeType>>
		$Assert.is<G, SomeType>()

		type H = Merge2Nullish<SomeType, null>
		$Assert.is<H, SomeType>()
	})

	it('generic', <_T extends Partial<SomeType>>() => {
		expect.assertions(0)

		//! TODO: make it work with generics

		// type B = Merge2Nullish<SomeType, T>
		// Assert.is<B, SomeType>()

		// type C = Merge2Nullish<PartialIfNullish<SomeType>, T>
		// Assert.is<C, SomeType>()

		// type D = Merge2Nullish<SomeType, VPartial<T>>
		// Assert.is<D, SomeType>()

		// type E = Merge2Nullish<SomeType, T>
		// Assert.is<E, SomeType>()

		// type G = Merge2Nullish<T, SomeType>
		// Assert.is<G, SomeType>()
	})
})
