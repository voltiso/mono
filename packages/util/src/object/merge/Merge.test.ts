// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { IsIdentical } from '~/type'

import type { Merge } from './Merge'

describe('Merge', () => {
	it('works', () => {
		expect.assertions(0)

		type A = Merge<{ a: 1; b: 2 }, { a: 2 }>
		$Assert<IsIdentical<A, { a: 2; b: 2 }>>()

		$Assert<
			IsIdentical<Merge<{ a: 1 }, { b: 2 }>, { a: 1; b: 2 }>,
			IsIdentical<Merge<{ a: 1 }, { a: 2 }>, { a: 2 }>,
			IsIdentical<Merge<{ a: { a: 1 } }, { a: { b: 2 } }>, { a: { b: 2 } }>
		>()
	})

	it('optional', () => {
		expect.assertions(0)

		type D = Merge<{ a?: 1 }, { a: 2 }>
		$Assert<IsIdentical<D, { a: 2 }>>()
	})

	type SomeType = {
		a: 1
		b: 2
	}

	it('generics', <T extends Partial<SomeType>>() => {
		expect.assertions(0)

		type G = Merge<T, SomeType>
		$Assert.is<G, SomeType>()
	})

	it('generics 2', <T extends SomeType>() => {
		expect.assertions(0)

		type B3 = Merge<T, { c: 3 }>
		type B5 = Merge<T, { c: 3 }>

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

		const c = {} as unknown as Merge<A, B>

		// hit F12 here:
		void c.a

		// hit F12 here:
		void c.b
	})
})
