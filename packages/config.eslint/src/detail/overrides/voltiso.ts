// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
import { EslintFlatConfig } from '@voltiso/config.eslint.lib'
import voltisoPlugin from '@voltiso/eslint-plugin'

export const voltisoOverride: EslintFlatConfig[] = defineEslintFlatConfig({
	files: ['*'],

	// plugins: ['@voltiso/eslint-plugin'],
	plugins: {
		'@voltiso/eslint-plugin': voltisoPlugin,
	},

	rules: {
		// 'n/file-extension-in-import': 0,
		// '@voltiso/file-extension-in-import': 1,
	},
} as const) as never
