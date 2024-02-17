// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintFlatConfig,
	eslintFlatConfigFromConfig,
} from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

// @ts-expect-error no typings
import reactNativePlugin from 'eslint-plugin-react-native'

// const baseConfig = reactNativePlugin.configs.all

// const baseFlatConfig = {
// 	...baseConfig,
// 	plugins: {
// 		'react-native': reactNativePlugin,
// 	},
// }

export const reactNative = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(reactNativePlugin.configs.all, {
		'react-native': reactNativePlugin,
	}),
	{
		files: codeFiles,

		// plugins: ['react-native'],
		// plugins: {
		// 	'react-native': reactNativePlugin,
		// },

		// extends: ['plugin:react-native/all'],

		// env: {
		// 	'react-native/react-native': true,
		// },

		languageOptions: {
			globals: {
				...reactNativePlugin.environments.globals,
			},
		},

		rules: {
			'react-native/no-unused-styles': 1,
			'react-native/no-inline-styles': 1,
			'react-native/no-color-literals': 1,
			'react-native/sort-styles': 1,
			'react-native/split-platform-components': 1,
			'react-native/no-raw-text': 0, //! enable if using react-native?
			'react-native/no-single-element-style-arrays': 1,
		},
	} as const,
)
