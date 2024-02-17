// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

// @ts-expect-error no typings
import reactNativeGlobalsPlugin from 'eslint-plugin-react-native-globals'

export const reactNativeGlobals = defineEslintConfigOverride({
	files: codeFiles,

	// plugins: ['react-native-globals'],
	plugins: {
		'react-native-globals': reactNativeGlobalsPlugin,
	},

	languageOptions: {
		globals: {
			...reactNativeGlobalsPlugin.environments.all.globals,
		},
	},

	// env: {
	// 	'react-native-globals/all': true,
	// },
} as const)
