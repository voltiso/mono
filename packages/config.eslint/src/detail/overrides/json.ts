// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import jsoncPlugin from 'eslint-plugin-jsonc'
import jsoncEslintParser from 'jsonc-eslint-parser'

import { filesInsideMd, jsonFiles } from '~/detail/files'

const allRules = getAllRules(jsoncPlugin as never, 'jsonc', 'warn')

// delete allRules['jsonc/sort-array-values']

/** `json` with comments */
export const jsoncConfig = defineEslintFlatConfig({
	files: jsonFiles,
	ignores: filesInsideMd,

	plugins: {
		jsonc: jsoncPlugin as never,
	},

	languageOptions: {
		parser: jsoncEslintParser as never,
	},

	rules: {
		...allRules,

		'jsonc/auto': 0, // ! slow!

		'jsonc/sort-array-values': 0,
		'jsonc/indent': 0, // handled by prettier

		'jsonc/key-name-casing': [
			'error',
			{ ignores: ['@', '.'], 'kebab-case': true },
		],

		'jsonc/no-comments': 0,
		'jsonc/sort-keys': 0,

		'jsonc/array-element-newline': 0, // conflicts with `prettier`
		'jsonc/array-bracket-newline': 0, // conflicts with `prettier`
		'jsonc/object-curly-spacing': 0, // conflicts with `prettier`
		'jsonc/object-property-newline': 0, // conflicts with `prettier`
	},
})

/** `json` without comments */
export const jsonConfig = defineEslintFlatConfig({
	files: [
		'package.json',
		'package.*.json',
		'turbo.json',
		'firebase.json',
		'**/.changeset/config.json',
	],

	rules: {
		'notice/notice': 0,
		'jsonc/no-comments': 2,
	},
})
