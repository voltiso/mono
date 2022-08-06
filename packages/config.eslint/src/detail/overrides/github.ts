// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

// import { codeFiles } from '~/_/files'

export const githubOverride = defineEslintConfigOverride({
	// extends: [
	// 	'plugin:github/recommended',
	// 	'plugin:github/internal',
	// 	'plugin:github/browser',
	// 	'plugin:github/typescript',
	// ],

	files: '*',
	// files: codeFiles,

	plugins: ['github'],

	rules: {
		'github/a11y-no-generic-link-text': 1,
		'github/array-foreach': 1,
		'github/async-currenttarget': 1,
		'github/async-preventdefault': 1,
		'github/authenticity-token': 1,
		'github/get-attribute': 1,
		'github/js-class-name': 1,
		'github/no-blur': 1,
		'github/no-d-none': 1,
		'github/no-dataset': 1,
		'github/no-implicit-buggy-globals': 1,
		'github/no-inner-html': 1,
		'github/no-innerText': 1,
		'github/no-dynamic-script-tag': 1,
		'github/no-then': 0, // handled by `promise`
		'github/no-useless-passive': 1,
		'github/prefer-observers': 1,
		'github/require-passive-events': 1,
		'github/unescaped-html-literal': 1,
	},
} as const)
