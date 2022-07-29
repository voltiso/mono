// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/_/files'

export const importOverride = defineEslintConfigOverride({
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
		'import/no-namespace': 0,

		'import/extensions': 1,

		// 'import/extensions': [
		// 	'error',
		// 	'ignorePackages',
		// 	{
		// 		'': 'never',
		// 		ts: 'never',
		// 		tsx: 'never',
		// 	},
		// ],

		'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],
		'import/no-relative-packages': 2,
		'import/no-duplicates': 1,
		// 'import/no-relative-parent-imports': 1, // use 'no-restricted-imports' instead

		'import/namespace': 0, // buggy when using custom "paths" in `tsconfig.json`
	},
} as const)
