// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { describe, expect, it } from '@jest/globals'

import { basePrettierConfig } from './basePrettierConfig'

describe('basePrettierConfig', () => {
	it('does not mess imports', () => {
		expect.hasAssertions()
		expect(basePrettierConfig).not.toHaveProperty('default')
	})
})
