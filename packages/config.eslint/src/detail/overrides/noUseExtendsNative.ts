// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import noUseExtendNativePlugin from 'eslint-plugin-no-use-extend-native'

export const noUseExtendNative = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(noUseExtendNativePlugin.configs.recommended, {
	// 	'no-use-extend-native': noUseExtendNativePlugin,
	// }),
	{
		// files: ['*'],

		// plugins: ['no-use-extend-native'],

		plugins: { 'no-use-extend-native': noUseExtendNativePlugin as never },

		// extends: ['plugin:no-use-extend-native/recommended'],

		rules: {
			...getAllRules(
				noUseExtendNativePlugin as never,
				'no-use-extend-native',
				'warn',
			),

			//
		},
	},
)
