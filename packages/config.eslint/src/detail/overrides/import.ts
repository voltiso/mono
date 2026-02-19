// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import type { Linter } from 'eslint'
import { defineConfig } from 'eslint/config'
import importPlugin from 'eslint-plugin-import'

import { codeFiles } from '~/detail/files'

const staticAnalysisRules: Linter.RulesRecord = {
	'import/no-unresolved': 0, // handled by TS
	// 'import/no-unresolved': ['error', { caseSensitiveStrict: true }],

	'import/no-relative-packages': 2,

	'import/no-useless-path-segments': 0,
	'@voltiso/no-useless-path-segments': ['warn', { noUselessIndex: true }],
	// 'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],

	'import/default': 1, // ! TS does the same?
	'import/no-restricted-paths': 1,
	'import/no-absolute-path': 1,
	'import/no-dynamic-require': 1,
	'import/no-self-import': 1,

	'import/named': 0, // buggy when using import from '~' (tsconfig -> paths)?
	'import/namespace': 0, // buggy when using custom "paths" in `tsconfig.json`
	'import/no-internal-modules': 0, // ! hmm... configure and enable?
	'import/no-webpack-loader-syntax': 0,
	'import/no-cycle': 0, // ! hmm... might be useful !

	'import/no-relative-parent-imports': 0, // use 'no-restricted-imports' instead
}

const helpfulWarningsRules: Linter.RulesRecord = {
	'import/export': 1,
	'import/no-named-as-default': 1, // TS does not do this
	'import/no-named-as-default-member': 1, // ! TS does the same?
	'import/no-deprecated': 0, // ! this is slow + we don't have a single deprecated import in `@voltiso/mono`
	'import/no-mutable-exports': 1,
	'import/no-unused-modules': 1, // TS does not do this

	'import/no-extraneous-dependencies': 0, // buggy with non-relative paths duplicate across projects in monorepo
} as const

const moduleSystemsRules: Linter.RulesRecord = {
	'import/unambiguous': 1,
	'import/no-commonjs': 1,
	'import/no-amd': 1,
	'import/no-import-module-exports': 1,

	'import/no-nodejs-modules': 0,
} as const

const styleGuideRules: Linter.RulesRecord = {
	'import/first': 1,

	'import/exports-last': 0,
	'import/no-duplicates': 1, // simple-import-sort does not handle this
	'import/no-namespace': 0,

	'import/extensions': 0, // handled by eslint-plugin-n + PATCH
	// 'import/extensions': [
	// 	'error',
	// 	'always',
	// 	{
	// 		ts: 'never',
	// 		tsx: 'never',
	// 	},
	// ],

	'import/newline-after-import': 1,
	'import/no-unassigned-import': 1,
	'import/no-named-default': 1,
	'import/no-default-export': 1, // named exports are better!
	'import/no-anonymous-default-export': 0,
	'import/dynamic-import-chunkname': 1,

	// 'import/extensions': [
	// 	'warn',
	// 	'always',
	// 	// {js: 'never', ts: 'never'},
	// 	Object.fromEntries(codeFiles.map(ext => [ext.slice(2), 'never'])),
	// ],

	// 'import/extensions': [
	// 	'error',
	// 	'ignorePackages',
	// 	{
	// 		'': 'never',
	// 		ts: 'never',
	// 		tsx: 'never',
	// 	},
	// ],

	'import/order': 0, // ! hmm... using simple-import-fix - but wondering if this would work better?
	'import/prefer-default-export': 0, // named exports are better!
	'import/max-dependencies': 0,
	'import/no-named-export': 0, // meh
	'import/group-exports': 0,
} as const

// console.log('111', importPlugin.configs.recommended)

export const importConfig = defineConfig(
	{
		files: codeFiles,

		plugins: { import: importPlugin as never },

		settings: {
			'import/parsers': {
				// espree: ['.js', '.cjs', '.mjs', '.jsx'],
				'@typescript-eslint/parser': codeFiles.map(s => s.slice(1)),
			},

			// eslint-disable-next-line unicorn/prefer-string-raw
			'import/ignore': ['node_modules/react-native/index\\.js$'],

			'import/extensions': codeFiles.map(s => s.slice(1)),

			'import/resolver': {
				// node: {
				// 	extensions: [
				// 		'.ts',
				// 		'.tsx',
				// 		'.mts',
				// 		'.mtsx',
				// 		'.cts',
				// 		'.ctsx',
				// 		//
				// 		'.js',
				// 		'.jsx',
				// 		'.mjs',
				// 		'.mjsx',
				// 		'.cjs',
				// 		'.cjsx',
				// 	],
				// },

				typescript: {
					/**
					 * Always try to resolve types under `<root>@types` directory even it
					 * doesn't contain any source code, like `@types/unist`
					 */
					alwaysTryTypes: true,

					// project: 'packages/*/tsconfig.json',
				},
			},
		},

		rules: {
			...getAllRules(importPlugin as never, 'import', 'warn'),

			...staticAnalysisRules,
			...helpfulWarningsRules,
			...moduleSystemsRules,
			...styleGuideRules,

			'import/enforce-node-protocol-usage': ['warn', 'always'],
		},
	},
	{
		files: ['**/eslint.config.js', '**/jest.config.js'],

		rules: {
			'import/no-default-export': 0,
		},
	},
	{
		// nextjs pages
		files: ['**/page.ts', '**/page.tsx', '**/layout.ts', '**/layout.tsx'],

		rules: {
			'import/no-default-export': 'off',
		},
	},
)
