// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsIdentical } from '../../type'
import { Assert } from '../../type'
import type { PartialIfNullish } from '../map/PartialIfNullish.js'
import type { VPartial } from '../map/VPartial.js'
import type { Merge2Nullish } from './Merge2Nullish.js'

describe('Merge2Nullish', () => {
	type SomeType = {
		a: 1
		b: 2
	}

	it('type', () => {
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

	it('generic', <T extends Partial<SomeType>>() => {
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

	it('jumps to definition (vscode - manual test)', () => {
		expect.assertions(0)

		const a = {
			a: 1,
		}

		const b = {
			b: 2,
		}

		const merged = {} as unknown as Merge2Nullish<typeof a, typeof b>
		void merged.a
		void merged.b
	})
})