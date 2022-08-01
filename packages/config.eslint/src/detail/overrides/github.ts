// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

// import { codeFiles } from '~/_/files'

export const githubOverride = defineEslintConfigOverride({
	extends: [
		'plugin:github/recommended',
		'plugin:github/internal',
		'plugin:github/browser',
		'plugin:github/typescript',
	],

	files: '*',
	// files: codeFiles,

	plugins: ['github'],

	rules: {
		'github/no-then': 0, // handles by `promise`
	},
} as const)
