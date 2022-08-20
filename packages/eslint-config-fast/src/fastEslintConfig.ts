// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line import/no-unassigned-import
import '@rushstack/eslint-patch/modern-module-resolution'

import baseEslintConfig from '@voltiso/config.eslint'
import { defineEslintConfig } from '@voltiso/config.eslint.lib'
import { reduceEslintConfig } from '@voltiso/config.eslint.lib'

const pluginsToPick = [
	'import', // ! slow
	// 'prettier', // ! not really needed, we run it separately

	//
	//
	// ! used
	'@typescript-eslint',
	'@typescript-eslint/eslint-plugin',
	'jest',
	'security',
	'simple-import-sort',
	'sonarjs',
	'unicorn',
	'destructuring',
	'notice',
	'tsdoc',
	'markdown',
	'promise',
	'etc',
	'ext',
	'no-secrets',
	'n', // n/no-extraneous-require
	'unused-imports',
	// 'json-schema-validator', // ! hangs on tsdoc.json??

	'yml',

	'testing-library',

	'@voltiso',
	'@voltiso/eslint-plugin',

	'regexp', // require 'u' unicode flag

	'eslint-comments', // !

	// ! framework-specific
	'react',
	'react-hooks',
	'@next/eslint-plugin-next',

	//
	//
	// ! not used ??

	// 'array-func',
	// 'chai-friendly',
	// 'css',
	// 'cypress',
	// 'editorconfig',
	// 'es',
	// 'format-message',
	// 'formatjs',
	// 'github',
	// 'html',
	// 'i18n',
	// 'i18n-text',
	// 'i18next',
	// 'jest-async',
	// 'jest-dom',
	// 'jest-formatting',
	// 'jsdoc',
	// 'json',
	// 'jsonc',
	// 'jsx',
	// 'jsx-a11y',
	// 'no-constructor-bind',
	// 'no-explicit-type-exports',
	// 'no-unsanitized',
	// 'no-use-extend-native',
	// 'node-dependencies',
	// 'putout',
	// 'react-native',
	// 'react-native-globals',
	// 'regex',
	// 'switch-case',
	// 'toml',
	// 'typescript-sort-keys',

	// ! not using for now
	// 'rxjs',
	// 'storybook',

	// ! definitely NOT USED
	// 'sort-keys-fix',
	// 'filenames',
	// 'indent-empty-lines',
	// 'optimize-regex',
	// 'prefer-arrow',
]

const reducedEslintConfig = reduceEslintConfig(baseEslintConfig, {
	pluginsToPick,
})

// export const fastEslintConfig = reducedEslintConfig

export const fastEslintConfig = defineEslintConfig({
	...reducedEslintConfig,

	extends: [
		...(reducedEslintConfig.extends as string[]),

		/**
		 * Turn off rules that conflict with prettier (even if not using
		 * `eslint-plugin-prettier`)
		 */
		'prettier',
	],

	rules: {
		...reducedEslintConfig.rules,

		// ...fastTypescriptRules,

		// ...fastImportRules,

		// // prettier off
		// 'prettier/prettier': 0,
	},
})

// // eslint-disable-next-line no-console
// console.log('fastEslintConfig', JSON.stringify(fastEslintConfig, null, 2))