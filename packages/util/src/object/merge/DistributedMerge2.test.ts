// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _, IsIdentical, OmitSuperComplex } from '~'
import { Assert } from '~/type'

import type { $Merge2 } from './DistributedMerge2'
import type { Merge2Complex } from './Merge2Complex'

describe('Merge2Trivial', () => {
	it('works', () => {
		expect.assertions(0)

		type A = $Merge2<{ a: 1; b: 2 }, { a: 2 }>
		Assert<IsIdentical<A, { a: 2; b: 2 }>>()

		Assert<
			IsIdentical<_<$Merge2<{ a: 1 }, { b: 2 }>>, { a: 1; b: 2 }>,
			IsIdentical<_<$Merge2<{ a: 1 }, { a: 2 }>>, { a: 2 }>,
			IsIdentical<_<$Merge2<{ a: { a: 1 } }, { a: { b: 2 } }>>, { a: { b: 2 } }>
		>()

		// type II = _<
		// 	Merge2Trivial<
		// 		{
		// 			a: 1
		// 		},
		// 		{
		// 			a: 2
		// 			readonly b?: 2
		// 		}
		// 	>
		// >

		// Assert<IsIdentical<II, { a: 2; readonly b?: 2 }>>()
	})

	it('optional', () => {
		expect.assertions(0)

		// type A = _<Merge2Trivial<{ a?: 1 }, { a?: 2 }>>
		// Assert<IsIdentical<A, { a?: 2 }>>() // different than Merge2

		// type B = _<Merge2Trivial<{ a: 1 }, { a?: 2 }>>
		// Assert<IsIdentical<B, { a?: 2 }>>() // different than Merge2

		type C = _<$Merge2<{ a: 1 }, { a: 2 }>>
		Assert<IsIdentical<C, { a: 2 }>>()

		type D = _<$Merge2<{ a?: 1 }, { a: 2 }>>
		Assert<IsIdentical<D, { a: 2 }>>()
	})

	type SomeType = {
		a: 1
		b: 2
	}

	it('generics', <T extends Partial<SomeType>>() => {
		expect.assertions(0)

		// type A = Merge2Trivial<SomeType, Partial<SomeType>>
		// Assert.is<A, Partial<SomeType>>() // different than Merge2

		// type B = Merge2Trivial<SomeType, T>
		// Assert.is<B, T>() // different than Merge2

		// type C = Merge2Trivial<PartialIfNullish<SomeType>, T>
		// Assert.is<C, T>() // different than Merge2

		// type D = Merge2Trivial<SomeType, VPartial<T>>
		// Assert.is<D, Partial<SomeType>>() // different than Merge2

		// type E = Merge2Trivial<SomeType, T>
		// Assert.is<E, T>() // different than Merge2

		type G = $Merge2<T, SomeType>
		Assert.is<G, SomeType>()
	})

	it('generics 2', <T extends SomeType>() => {
		expect.assertions(0)

		type B1 = Omit<T, 'c'> & { c: 3 }
		type B2 = _<OmitSuperComplex<T, 'c'> & { c: 3 }>
		type B3 = Merge2Complex<T, { c: 3 }>
		type B5 = $Merge2<T, { c: 3 }>

		Assert.is<B1, SomeType>()
		Assert.is<B2, SomeType>()
		Assert.is<B3, SomeType>()
		Assert.is<B5, SomeType>()

		Assert.is<OmitSuperComplex<T, 'c'> & { c: 3 }, SomeType>()
	})

	it('vscode - jump to definition (manual test...)', () => {
		expect.assertions(0)

		type A = {
			readonly a?: 1
			b: 2
		}

		type B = {
			readonly b?: 3
		}

		const c = {} as unknown as $Merge2<A, B>

		// hit F12 here:
		void c.a

		// hit F12 here:
		void c.b
	})
})
