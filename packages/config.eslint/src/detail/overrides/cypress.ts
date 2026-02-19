// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import cypressPlugin from 'eslint-plugin-cypress'
import { defineConfig } from 'eslint/config'
import { getAllRules } from '@voltiso/config.eslint.lib'

export const cypress = defineConfig({
	...cypressPlugin.configs.recommended,
	// files: ['*'],

	// plugins: ['cypress'],
	plugins: {
		cypress: cypressPlugin as never,
	},

	rules: {
		...getAllRules(cypressPlugin as never, 'cypress', 'warn'),
		// ...(cypressPlugin.configs.recommended.rules as {}),

		// 'cypress/no-assigning-return-values': 'error',
		// 'cypress/no-unnecessary-waiting': 'error',
		// 'cypress/assertion-before-screenshot': 'warn',
		// 'cypress/no-force': 'warn',
		// 'cypress/no-async-tests': 'error',
		// 'cypress/no-pause': 'error',
	},
})
