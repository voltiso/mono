// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import i18nextPlugin from 'eslint-plugin-i18next'

export const i18nextConfig = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(i18nextPlugin.configs.recommended, {
	// 	i18next: i18nextPlugin,
	// }),
	{
		// files: '*',
		plugins: {
			i18next: i18nextPlugin as never,
		},

		// extends: ['plugin:i18next/recommended'],

		rules: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...(i18nextPlugin.configs.recommended.rules as {}),

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
	},
)
