// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const eslintComments = defineEslintConfigOverride({
	files: ['*'],

	extends: ['plugin:eslint-comments/recommended'],

	plugins: ['eslint-comments'],

	rules: {
		'eslint-comments/disable-enable-pair': 0,
		'eslint-comments/no-unused-disable': 1,
		'eslint-comments/no-use': 0,
		'eslint-comments/no-unlimited-disable': 0, // handled by unicorn
	},
} as const)
