// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import i18nextPlugin from 'eslint-plugin-i18next'

export const i18next = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(i18nextPlugin.configs.recommended, {i18next: i18nextPlugin}),
	{
		// files: '*',

		// plugins: ['i18next'],
		// plugins: {
		// 	i18next: i18nextPlugin,
		// },

		// extends: ['plugin:i18next/recommended'],

		rules: {
			'i18next/no-literal-string': 0,
			// 'i18next/no-literal-string': 2,

			// 'i18next/no-literal-string': [
			// 	'error',
			// 	{
			// 		mode: 'jsx-text-only',
			// 		// mode: 'all',
			// 		'should-validate-template': true,
			// 	},
			// ],
		},
	} as const,
)
