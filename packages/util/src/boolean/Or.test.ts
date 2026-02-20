// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert, $Is } from '_'

import type { Or } from './Or'

describe('or', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert(
			$Is<Or<true, true>>() //
				.identicalTo<true>(),

			$Is<Or<true, false>>() //
				.identicalTo<true>(),

			$Is<Or<false, boolean>>() //
				.identicalTo<boolean>(),

			$Is<Or<true, boolean>>() //
				.identicalTo<true>(),

			$Is<Or<boolean, boolean>>() //
				.identicalTo<boolean>(),
		)
	})
})
