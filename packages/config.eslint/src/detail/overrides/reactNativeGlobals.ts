// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import reactNativeGlobalsPlugin from 'eslint-plugin-react-native-globals'

import { codeFiles } from '~/detail/files'

export const reactNativeGlobals = defineEslintFlatConfig({
	files: codeFiles,

	// plugins: ['react-native-globals'],
	plugins: {
		'react-native-globals': reactNativeGlobalsPlugin as never,
	},

	languageOptions: {
		globals: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...(reactNativeGlobalsPlugin.environments.all.globals as {}),
		},
	},

	// env: {
	// 	'react-native-globals/all': true,
	// },
})
