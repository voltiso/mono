// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
import { getAllRules } from '@voltiso/config.eslint.lib'
import turboPlugin from 'eslint-plugin-turbo'

export const turboConfig = defineConfig({
	// files: '*',

	plugins: {
		turbo: turboPlugin as never,
	},

	// extends: ['turbo'],

	rules: {
		...getAllRules(turboPlugin as never, 'turbo', 'warn'),

		// 'turbo/no-undeclared-env-vars': 1,
	},
})
