// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFiles } from '../files.js'

export const importOverride = {
	extends: [
		'plugin:import/recommended',
		'plugin:import/warnings',
		'plugin:import/errors',
		'plugin:import/typescript',
	],

	files: codeFiles,

	plugins: ['import'],

	rules: {
		'import/no-nodejs-modules': 0,
		'import/no-unresolved': 2,
	},

	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': [
				'.ts',
				'.tsx',
				'.mts',
				'.mtsx',
				'.cts',
				'.ctsx',
				//
				'.js',
				'.jsx',
				'.mjs',
				'.mjsx',
				'.cjs',
				'.cjsx',
			],
		},

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

				// Project: 'path/to/folder',
			},
		},
	},
}
