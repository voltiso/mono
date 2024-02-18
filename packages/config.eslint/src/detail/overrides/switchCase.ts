// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import switchCasePlugin from 'eslint-plugin-switch-case'

// console.log('!!!', switchCasePlugin.configs.recommended)

export const switchCase = defineEslintFlatConfig(
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
