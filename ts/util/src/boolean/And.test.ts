// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert, $Is } from '_'
import { describe, expect, it } from 'vitest'

import type { And } from './And'

describe('and', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert(
			$Is<And<true, true>>() //
				.identicalTo<true>(),

			$Is<And<true, false>>() //
				.identicalTo<false>(),

			$Is<And<false, boolean>>() //
				.identicalTo<false>(),

			$Is<And<true, boolean>>() //
				.identicalTo<boolean>(),

			$Is<And<boolean, boolean>>() //
				.identicalTo<boolean>(),
		)
	})
})
