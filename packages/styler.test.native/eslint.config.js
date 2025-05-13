// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import baseConfig from '@~/workspace/eslint.config.js'

export default defineEslintFlatConfig(...baseConfig, {
	rules: {
		'node-dependencies/absolute-version': 'off',
	},
})
