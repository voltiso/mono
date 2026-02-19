// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
import i18nextPlugin from 'eslint-plugin-i18next'

export const i18nextConfig = defineConfig(
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
			...(i18nextPlugin.configs['flat/recommended'].rules as {}),

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
