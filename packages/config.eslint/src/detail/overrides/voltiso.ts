// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const voltisoOverride = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['@voltiso/eslint-plugin'],

	rules: {
		// 'n/file-extension-in-import': 0,
		// '@voltiso/file-extension-in-import': 1,
	},
} as const)
