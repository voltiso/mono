// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from '@jest/globals'

import type { Tail } from './Tail'

describe('array/Tail', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert(
			$Is<Tail<[1, 2, 3]>>() //
				.identicalTo<[2, 3]>(),

			$Is<Tail<readonly [1, 2, 3]>>() //
				.identicalTo<readonly [2, 3]>(),
		)
	})
})
