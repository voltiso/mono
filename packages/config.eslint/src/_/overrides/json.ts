// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sort-keys-fix/sort-keys-fix */

import { jsonFiles } from '../files.js'

/** `json` with comments */
export const jsonc = {
	files: jsonFiles,

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

		// 'jsonc/no-comments': 0,
		'jsonc/sort-keys': 0,
		// 'putout/putout': 0,

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
}

/** `json` without comments */
export const json = {
	files: ['package.json'],

	rules: {
		'notice/notice': 0,
	},
}
