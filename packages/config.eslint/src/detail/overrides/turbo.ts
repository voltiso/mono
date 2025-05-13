// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import turboPlugin from 'eslint-plugin-turbo'

export const turboConfig = defineEslintFlatConfig({
	// files: '*',

	plugins: {
		turbo: turboPlugin as never,
	},

	// extends: ['turbo'],

	rules: {
		...getAllRules(turboPlugin as never, 'turbo', 'warn'),

		'turbo/no-undeclared-env-vars': 1,
	},
})
