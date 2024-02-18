// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import voltisoPlugin from '@voltiso/eslint-plugin'

export const voltisoOverride = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['@voltiso/eslint-plugin'],
	plugins: {
		'@voltiso/eslint-plugin': voltisoPlugin as never,
	},

	rules: {
		...getAllRules(voltisoPlugin, '@voltiso', 'warn'),

		// 'n/file-extension-in-import': 0,
		// '@voltiso/file-extension-in-import': 1,
	},
})
