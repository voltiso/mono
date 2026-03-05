// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from 'vitest'

import { isRegex } from './isRegex'

describe('isRegex', () => {
	it('null proto', () => {
		expect.hasAssertions()

		expect(isRegex(Object.setPrototypeOf({}, null))).toBeFalsy()
	})
})
