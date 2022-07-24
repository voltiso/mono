// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { filesInsideMd, jsonFiles } from '../files.js'

/** `json` with comments */
export const jsonc = defineEslintConfigOverride({
	files: jsonFiles,
	excludedFiles: filesInsideMd,

	extends: [
		// 'plugin:json/recommended', // ! breaks `prettier/prettier`
		// 'plugin:json/recommended-with-comments', // ! breaks `prettier/prettier`

		// 'plugin:jsonc/recommended-with-jsonc',
		'plugin:jsonc/all',

		'plugin:json-schema-validator/recommended',
	],

	// parser: 'jsonc-eslint-parser',
	plugins: [
		// 'json', // ! breaks `prettier/prettier`
		'jsonc',

		'json-schema-validator',

		// 'json-files', // ! breaks `prettier/prettier` // does not work with `jsonc-eslint-parser`
	],

	// parserOptions: {
	// 	jsonSyntax: 'JSON5',
	// },

	rules: {
		// 'jsdoc/require-file-overview': 0,
		// 'json-schema-validator/no-invalid': [
		// 	'error',
		// 	{
		// 		useSchemastoreCatalog: true,
		// 	},
		// ],
		// 'json/*': 2,
		// 'jsonc/array-element-newline': 0,
		'jsonc/indent': ['error', 'tab'],

		'jsonc/key-name-casing': [
			'error',
			{ ignores: ['@', '.'], 'kebab-case': true },
		],

		'jsonc/no-comments': 0,
		'jsonc/sort-keys': 0,
		// 'putout/putout': 0,

		'jsonc/array-element-newline': 0, // conflicts with `prettier`
		'jsonc/array-bracket-newline': 0, // conflicts with `prettier`
		'jsonc/object-curly-spacing': 0, // conflicts with `prettier`

		// ! `json-files` breaks `prettier/prettier` ⬇️
		// // ⬇️ eslint-plugin-json-files
		// 'json-files/ensure-repository-directory': 'error',
		// 'json-files/no-branch-in-dependencies': 'error',
		// 'json-files/require-engines': 'error',
		// 'json-files/require-license': 'error',
		// 'json-files/require-unique-dependency-names': 'error',
		// 'json-files/restrict-ranges': 'error',
		// 'json-files/sort-package-json': 'error',
		// 'json-files/validate-schema': 'error',
	},
})

/** `json` without comments */
export const json = defineEslintConfigOverride({
	files: ['package.json', 'turbo.json'],

	rules: {
		'notice/notice': 0,
		'jsonc/no-comments': 2,
	},
})
