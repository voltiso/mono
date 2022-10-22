// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '~/$strip'

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
})
