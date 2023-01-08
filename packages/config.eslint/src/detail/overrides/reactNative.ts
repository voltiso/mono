// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

export const reactNative = defineEslintConfigOverride({
	files: codeFiles,

	plugins: ['react-native'],

	extends: ['plugin:react-native/all'],

	env: {
		'react-native/react-native': true,
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
} as const)
