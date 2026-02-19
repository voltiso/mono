// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from '@jest/globals'

import type { Parity } from './Parity'

describe('list', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert(
			$Is<Parity<[]>>()(0 as const),
			$Is<Parity<readonly [0, 0, 0, 0]>>()(0 as const),
			$Is<Parity<[0, 0, 0]>>()(1 as const),
			// Is<Parity<Date>>()<never>(),
			$Is<Parity<unknown[]>>()<0 | 1>(),
			$Is<Parity<[0] | [0, 0, 0]>>()(1 as const),
			$Is<Parity<[0] | [0, 0, 0, 0]>>()<0 | 1>(),
		)
	})
})
