// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { basePrettierConfig } from './basePrettierConfig.js'

describe('basePrettierConfig', () => {
	it('does not mess imports', () => {
		expect.hasAssertions()
		expect(basePrettierConfig).not.toHaveProperty('default')
	})
})
