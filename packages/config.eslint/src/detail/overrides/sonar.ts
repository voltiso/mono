// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintFlatConfig,
	eslintFlatConfigFromConfig,
} from '@voltiso/config.eslint.lib'
import sonarJsPlugin from 'eslint-plugin-sonarjs'

export const sonar = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(sonarJsPlugin.configs.recommended as never, {
		sonarjs: sonarJsPlugin,
	}),
	{
		// files: ['*'],

		// extends: ['plugin:sonarjs/recommended'],
		// plugins: ['sonarjs'],

		rules: {
			'sonarjs/cognitive-complexity': 0, // hmm, may be useful
			'sonarjs/elseif-without-else': 0,
			'sonarjs/prefer-single-boolean-return': 0,
			'sonarjs/no-collapsible-if': 0, // unicorn has auto-fix for this!!

			/**
			 * Nope - variable name can serve as comment, and it's easier to add
			 * console.log for debugging
			 */
			'sonarjs/prefer-immediate-return': 0,

			'sonarjs/no-identical-expressions': 1,
			'sonarjs/no-inverted-boolean-check': 1,
			'sonarjs/no-all-duplicated-branches': 1,
			'sonarjs/no-duplicate-string': 1,
			'sonarjs/no-unused-collection': 1,
		},
	} as const,
)
