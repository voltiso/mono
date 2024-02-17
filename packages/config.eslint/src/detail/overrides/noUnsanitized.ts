// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import noUnsanitizedPlugin from 'eslint-plugin-no-unsanitized'

export const noUnsanitized = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(noUnsanitizedPlugin.configs.DOM, {
	// 	'no-unsanitized': noUnsanitizedPlugin,
	// }),
	{
		// extends: ['plugin:no-unsanitized/DOM'],

		// files: ['*'],

		plugins: { 'no-unsanitized': noUnsanitizedPlugin as never },

		rules: {
			...getAllRules(noUnsanitizedPlugin as never, 'no-unsanitized', 'warn'),

			'no-unsanitized/method': 'error',
			'no-unsanitized/property': 'error',
		},
	} as const,
)
