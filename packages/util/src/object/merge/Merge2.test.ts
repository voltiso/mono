// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '~/$strip'
import type { IsIdentical } from '~/type'

import type { Merge2 } from './Merge2'

describe('Merge2', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Merge2<{ a: 1; b: 2 }, { a: 2 }>
		$Assert<IsIdentical<A, { a: 2; b: 2 }>>()

		$Assert<
			IsIdentical<Merge2<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>,
			IsIdentical<Merge2<{ a: 1 }, { a: 2 }>, { a: 2 }>,
			IsIdentical<Merge2<{ a: { a: 1 } }, { a: { b: 2 } }>, { a: { b: 2 } }>
		>()
	})

	it('optional', () => {
		expect.assertions(0)

		type D = Merge2<{ a?: 1 }, { a: 2 }>
		$Assert<IsIdentical<D, { a: 2 }>>()
	})

	type SomeType = {
		a: 1
		b: 2
	}

	it('generics', <T extends Partial<SomeType>>() => {
		expect.assertions(0)

		type G = Merge2<T, SomeType>
		$Assert.is<G, SomeType>()
	})

	it('generics 2', <T extends SomeType>() => {
		expect.assertions(0)

		type B3 = Merge2<T, { c: 3 }>
		type B5 = Merge2<T, { c: 3 }>

		$Assert.is<B3, SomeType>()
		$Assert.is<B5, SomeType>()
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

		const c = {} as unknown as Merge2<A, B>

		// hit F12 here:
		void c.a

		// hit F12 here:
		void c.b
	})
})
