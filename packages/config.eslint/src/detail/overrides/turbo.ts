// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import turboPlugin from 'eslint-plugin-turbo'

export const turbo = defineEslintConfigOverride({
	// files: '*',

	// plugins: ['turbo'],

	plugins: {
		turbo: turboPlugin,
	},

	// extends: ['turbo'],

	rules: {
		'turbo/no-undeclared-env-vars': 1,
	},
} as const)
