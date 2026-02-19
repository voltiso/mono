// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { UNSET } from '_'
import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { Default } from './Operation'

describe('def', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert.is<Default<UNSET, 123>, 123>()
		$Assert.is<Default<1, 2>, 1>()
	})
})
