// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import jsxAllyPlugin from 'eslint-plugin-jsx-a11y'

export const jsxAllyConfig = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(jsxAllyPlugin.configs.recommended, {
	// 	'jsx-a11y': jsxAllyPlugin,
	// }),
	{
		// files: ['*'],

		// extends: ['plugin:jsx-a11y/recommended'],

		plugins: {
			'jsx-a11y': jsxAllyPlugin as never,
		},

		rules: {
			...getAllRules(jsxAllyPlugin as never, 'jsx-a11y', 'warn'),

			'jsx-a11y/no-autofocus': 0, // hmm
		},
	} as const,
)
