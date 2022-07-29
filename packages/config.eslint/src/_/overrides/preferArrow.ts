// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const preferArrow = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['prefer-arrow'],

	rules: {
		'prefer-arrow/prefer-arrow-functions': 0, // well... this plugin is now unused
	},
} as const)
