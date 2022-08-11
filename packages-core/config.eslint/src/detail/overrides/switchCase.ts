// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const switchCase = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['switch-case'],

	extends: ['plugin:switch-case/recommended'],

	rules: {
		'switch-case/newline-between-switch-case': 0, // crashes eslint!
		'switch-case/no-case-curly': 2,
	},
} as const)
