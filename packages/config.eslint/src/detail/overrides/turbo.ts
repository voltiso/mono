// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	getAllRules,
} from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import turboPlugin from 'eslint-plugin-turbo'

export const turbo = defineEslintConfigOverride({
	// files: '*',

	plugins: {
		turbo: turboPlugin as never,
	},

	// extends: ['turbo'],

	rules: {
		...getAllRules(turboPlugin as never, 'turbo', 'warn'),

		'turbo/no-undeclared-env-vars': 1,
	},
} as const)
