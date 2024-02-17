// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintFlatConfig,
	EslintFlatConfig,
} from '@voltiso/config.eslint.lib'

import { codeFiles } from './detail/files.js'

import { checkHeapSize } from './detail/checkHeapSize.js'
import { ignores } from './detail/ignorePatterns.js'

import js from '@eslint/js'

import globals from 'globals'
import { overrides } from './overrides'

checkHeapSize()

export const baseEslintConfig: EslintFlatConfig[] = defineEslintFlatConfig(
	js.configs.all,
	{
		// root: true, // ! override this explicitly

		// env: {
		// 	browser: true,
		// 	es2022: true,
		// 	node: true,
		// },

		// ignorePatterns: ignores,
		ignores,

		// extends: ['eslint:all'],

		rules: {
			'max-lines': 0,
			'capitalized-comments': 0,

			// ...rulesHandledByPrettier,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				// ...globals.es2021,
				...globals.node,
			},

			sourceType: 'module',

			parserOptions: {
				// ecmaVersion: 3, // oldest possible
				// ecmaVersion: 2021, // 2022-08-11 - no `Object.ownKeys` (ES2022) in Safari
				ecmaVersion: 'latest',

				ecmaFeatures: {
					jsx: true,
				},

				jsxPragma: null as never, // for @typescript/eslint-parser

				project: ['tsconfig.json', 'packages/*/tsconfig.json'], //! you may want to override this
				// project: tsconfigPath, //! you may want to override this
				// tsconfigRootDir: __dirname, //! you may want to override this
			},
		},

		settings: {
			react: {
				version: 'detect',
			},

			'import/parsers': {
				'@typescript-eslint/parser': codeFiles.map(s => s.slice(1)),
			},

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
	} as const,
	...overrides,
)
