// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import baseJestConfig from '@voltiso/config.jest'
import { defineEslintConfig } from '@voltiso/config.eslint.lib'

//! need to create a new unique object!
export default defineEslintConfig({
	...baseJestConfig,
	// testEnvironment: 'node',
})
