// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const turbo = defineEslintConfigOverride({
	files: '*',

	plugins: ['turbo'],

	// extends: ['turbo'],

	rules: {
		'turbo/no-undeclared-env-vars': 1,
	},
} as const)
