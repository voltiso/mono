// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { strictNullChecks } from '~'

describe('Have_strictNullChecks', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<strictNullChecks>()
	})
})
