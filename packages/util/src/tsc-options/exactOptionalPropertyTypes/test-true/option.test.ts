// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $Assert } from '_'
import { describe, expect, it } from '@jest/globals'

import type { exactOptionalPropertyTypes } from '~'

describe('exactOptionalPropertyTypes - true', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<exactOptionalPropertyTypes>()
	})
})
