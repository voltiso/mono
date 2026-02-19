// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

// eslint-disable-next-line no-restricted-imports, import/no-relative-packages
import baseConfig from '../../eslint.config.js'

export default defineConfig(...baseConfig, {
	rules: {
		'jest/prefer-ending-with-an-expect': 0, // too many errors... not time to fix, we have fake type-tests
	},
})
