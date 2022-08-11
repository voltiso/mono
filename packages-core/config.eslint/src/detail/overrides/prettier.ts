// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

// import { codeFiles } from '~/_/files'

export const prettierOverride = defineEslintConfigOverride({
	files: ['*'],

	/** Do not use prettier for JS/TS, because it does not allow for `putout/align-spaces` */
	// excludedFiles: codeFiles,

	plugins: ['prettier'],

	extends: ['plugin:prettier/recommended'],

	rules: {
		'prettier/prettier': 'warn',
	},
} as const)
