// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import parentConfig from '../../eslint.config.js'

export default defineEslintFlatConfig(...parentConfig, {
	rules: {
		'node-dependencies/absolute-version': 0,
	},
})
