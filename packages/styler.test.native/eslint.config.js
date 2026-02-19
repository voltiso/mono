// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

import baseConfig from '@~/workspace/eslint.config.js'

export default defineConfig(...baseConfig, {
	rules: {
		'node-dependencies/absolute-version': 'off',
	},
})
