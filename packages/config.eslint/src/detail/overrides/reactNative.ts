// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import reactNativePlugin from 'eslint-plugin-react-native'

import { codeFiles } from '~/detail/files'

// const baseConfig = reactNativePlugin.configs.all

// const baseFlatConfig = {
// 	...baseConfig,
// 	plugins: {
// 		'react-native': reactNativePlugin,
// 	},
// }

export const reactNative = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(reactNativePlugin.configs.all, {
	// 	'react-native': reactNativePlugin,
	// }),
	{
		files: codeFiles,

		plugins: {
			'react-native': reactNativePlugin as never,
		},

		// extends: ['plugin:react-native/all'],

		// env: {
		// 	'react-native/react-native': true,
		// },

		languageOptions: {
			globals: {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				...(reactNativePlugin.environments.globals as {}),
			},
		},

		rules: {
			...getAllRules(reactNativePlugin as never, 'react-native', 'warn'),

			'react-native/no-unused-styles': 1,
			'react-native/no-inline-styles': 1,
			'react-native/no-color-literals': 1,
			'react-native/sort-styles': 1,
			'react-native/split-platform-components': 1,
			'react-native/no-raw-text': 0, //! enable if using react-native?
			'react-native/no-single-element-style-arrays': 1,
		},
	},
)
