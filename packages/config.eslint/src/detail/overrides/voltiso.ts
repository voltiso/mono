// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EslintFlatConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import voltisoPlugin from '@voltiso/eslint-plugin'

export const voltisoOverride: EslintFlatConfig[] = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['@voltiso/eslint-plugin'],
	plugins: {
		'@voltiso/eslint-plugin': voltisoPlugin,
	},

	rules: {
		...getAllRules(voltisoPlugin, '@voltiso', 'warn'),

		// 'n/file-extension-in-import': 0,
		// '@voltiso/file-extension-in-import': 1,
	},
} as const) as never
