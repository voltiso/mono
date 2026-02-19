// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import switchCasePlugin from 'eslint-plugin-switch-case'

// console.log('!!!', switchCasePlugin.configs.recommended)

export const switchCase = defineConfig(
	// {
	// 	...switchCasePlugin.configs.recommended,

	// 	plugins: {
	// 		'switch-case': switchCasePlugin as never,
	// 	},
	// },
	{
		// files: ['*'],

		plugins: {
			'switch-case': switchCasePlugin as never,
		},

		// extends: ['plugin:switch-case/recommended'],

		rules: {
			...getAllRules(switchCasePlugin as never, 'switch-case', 'warn'),

			'switch-case/newline-between-switch-case': 0, // crashes eslint!
			'switch-case/no-case-curly': 1,
		},
	},
)
