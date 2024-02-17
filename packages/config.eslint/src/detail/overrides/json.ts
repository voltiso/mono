// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { filesInsideMd, jsonFiles } from '~/detail/files'

import jsoncPlugin from 'eslint-plugin-jsonc'
import jsoncEslintParser from 'jsonc-eslint-parser'
import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'

// console.log('!!!', jsoncPlugin.configs.base)

const jsoncConfigBase = {...jsoncPlugin.configs.base}
for(const override of jsoncConfigBase.overrides) {
	if(override.parser.includes('jsonc-eslint-parser')) {
		override.parser = jsoncEslintParser as never
	}
}

const jsoncConfigAll = {...jsoncPlugin.configs.all}
delete (jsoncConfigAll as any).extends

/** `json` with comments */
export const jsonc = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(jsoncPlugin.configs.base as never, {jsonc: jsoncPlugin}),
	jsoncConfigAll, {
	files: jsonFiles,
	ignores: filesInsideMd,

	// extends: [
	// 	// 'plugin:json/recommended', // ! breaks `prettier/prettier`
	// 	// 'plugin:json/recommended-with-comments', // ! breaks `prettier/prettier`

	// 	// 'plugin:jsonc/recommended-with-jsonc',
	// 	'plugin:jsonc/all',

	// 	// 'plugin:json-schema-validator/recommended', // ! hangs!
	// ],

	// // parser: 'jsonc-eslint-parser',
	// plugins: [
	// 	// 'json', // ! breaks `prettier/prettier`
	// 	'jsonc',

	// 	// 'json-schema-validator', // ! hangs!

	// 	// 'json-files', // ! breaks `prettier/prettier` // does not work with `jsonc-eslint-parser`
	// ],

	plugins: {
		jsonc: jsoncPlugin,
	},

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
		// 'jsonc/indent': ['error', 'tab'],
		'jsonc/indent': 0, // handled by prettier

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
		'jsonc/object-property-newline': 0, // conflicts with `prettier`

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
} as const)

/** `json` without comments */
export const json = defineEslintFlatConfig({
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
} as const)
