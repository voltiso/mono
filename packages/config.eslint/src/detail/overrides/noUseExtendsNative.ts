// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import noUseExtendNativePlugin from 'eslint-plugin-no-use-extend-native'

export const noUseExtendNative = defineEslintFlatConfig(
  ...eslintFlatConfigFromConfig(	noUseExtendNativePlugin.configs.recommended, {'no-use-extend-native': noUseExtendNativePlugin}),
	{
		// files: ['*'],

		// plugins: ['no-use-extend-native'],

		// extends: ['plugin:no-use-extend-native/recommended'],

		rules: {
			'no-use-extend-native/no-use-extend-native': 1,
		},
	} as const,
)
