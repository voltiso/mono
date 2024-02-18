// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'

import type { IsIdentical } from '~/type'

import type { BivariantCallable } from './BivariantCallable'

describe('Bivariant', () => {
	it('callable', () => {
		expect.assertions(0)

		$Assert.is<(x: 0) => 0, BivariantCallable<(x: 0 | 1) => 0 | 1>>()
		$Assert.is<(x: 0 | 1) => 0, BivariantCallable<(x: 0) => 0 | 1>>()

		$Assert(
			$Is<(x: 0 | 1) => 0>().not.subtypeOf<
				BivariantCallable<(x: 1 | 2) => 0>
			>(),
		)
	})

	it('works with `this`', () => {
		type A = BivariantCallable<(this: string, a: number) => string>
		$Assert<IsIdentical<A, (this: string, a: number) => string>>()

		type B = BivariantCallable<(a: number) => string>
		$Assert<IsIdentical<B, (a: number) => string>>()
	})

	it('misc', () => {
		$Assert<IsIdentical<(this: unknown) => void, () => void>>()
	})
})
