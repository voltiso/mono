// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

// import { codeFiles } from '../files.js'

export const reactNative = defineEslintConfigOverride({
	files: '*',
	// files: codeFiles,

	plugins: ['react-native', 'react-native-globals'],

	env: {
		'react-native-globals/all': true,
		'react-native/react-native': true,
	},

	rules: {
		'react-native/no-color-literals': 2,
		'react-native/no-inline-styles': 2,
		'react-native/no-raw-text': 0, //! enable if using react-native?
		'react-native/no-single-element-style-arrays': 2,
		'react-native/no-unused-styles': 2,
		'react-native/split-platform-components': 2,
	},
})
