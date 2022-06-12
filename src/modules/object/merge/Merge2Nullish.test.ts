/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable max-statements */
/* eslint-disable no-magic-numbers */
import { IsIdentical } from '../../../IsEqual'
import { Assert } from '../../bdd'
import { PartialIfNullish, VPartial } from '../map'
import { Merge2Nullish } from './Merge2Nullish'

describe('merge', () => {
	type SomeType = {
		a: 1
		b: 2
	}

	it('Merge2 - nullish', () => {
		expect.assertions(0)

		type A = Merge2Nullish<{ a: 1 }, null>
		Assert<IsIdentical<A, { a: 1 }>>()

		type B = Merge2Nullish<null, null>
		Assert<IsIdentical<B, {}>>()

		type C = Merge2Nullish<null, { a: 1 }>
		Assert<IsIdentical<C, { a: 1 }>>()

		type D = Merge2Nullish<{ a: 'a' } | null, { a: 'aa' } | null>
		Assert<IsIdentical<D, { a?: 'a' | 'aa' }>>()

		type E = Merge2Nullish<{ a: 'a' }, { a: 'aa' } | null>
		Assert<IsIdentical<E, { a: 'a' | 'aa' }>>()

		type F = Merge2Nullish<{ a?: 'a' } | undefined | null, { a: 'aa' }>
		Assert<IsIdentical<F, { a: 'aa' }>>()
	})

	it('Merge2Nullish - generics', <T extends Partial<SomeType>>() => {
		expect.assertions(0)

		type A = Merge2Nullish<SomeType, Partial<SomeType>>
		Assert.is<A, SomeType>()

		type B = Merge2Nullish<SomeType, T>
		Assert.is<B, SomeType>()

		type C = Merge2Nullish<PartialIfNullish<SomeType>, T>
		Assert.is<C, SomeType>()

		type D = Merge2Nullish<SomeType, VPartial<T>>
		Assert.is<D, SomeType>()

		type E = Merge2Nullish<SomeType, T>
		Assert.is<E, SomeType>()

		type F = Merge2Nullish<SomeType, null>
		Assert.is<F, SomeType>()

		type G = Merge2Nullish<T, SomeType>
		Assert.is<G, SomeType>()
	})
})
