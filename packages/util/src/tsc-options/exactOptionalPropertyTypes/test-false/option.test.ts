// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'
import { $Assert } from '_'

import type { exactOptionalPropertyTypes, Not } from '~'

describe('exactOptionalPropertyTypes - false', () => {
	it('works', () => {
		expect.assertions(0)

		$Assert<Not<exactOptionalPropertyTypes>>()
	})
})
