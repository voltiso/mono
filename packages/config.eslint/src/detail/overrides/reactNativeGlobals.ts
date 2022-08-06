// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

// import { codeFiles } from '~/_/files'

export const reactNativeGlobals = defineEslintConfigOverride({
	files: codeFiles,

	plugins: ['react-native-globals'],

	env: {
		'react-native-globals/all': true,
	},
} as const)
