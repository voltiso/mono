// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const unicorn = defineEslintConfigOverride({
	extends: ['plugin:unicorn/all'],

	files: '*',

	plugins: ['unicorn'],

	rules: {
		// 'unicorn/filename-case': [
		// 	'error',
		// 	{ cases: { camelCase: true, pascalCase: true } },
		// ],

		'unicorn/filename-case': 0, // does not allow `someName_.ts`

		'unicorn/import-index': 2,

		'unicorn/prevent-abbreviations': 0,

		// 'unicorn/prevent-abbreviations': [
		// 	'error',
		// 	{
		// 		allowList: {
		// 			arg: true,
		// 			Arg: true,
		// 			args: true,
		// 			Args: true,
		// 			Arr: true,
		// 			obj: true,
		// 			Obj: true,
		// 			str: true,
		// 			Str: true,
		// 			func: true,
		// 			Func: true,
		// 			dir: true,
		// 			dirs: true,
		// 			compatDirs: true,
		// 			props: true,
		// 		},

		// 		replacements: {
		// 			fun: { func: true },
		// 			Fun: { Func: true },
		// 			op: { operation: true, operand: true },
		// 			Op: { Operation: true, Operand: true },
		// 		},
		// 	},
		// ],

		'unicorn/no-useless-undefined': ['error', { checkArguments: false }],

		'unicorn/no-keyword-prefix': 0,
		'unicorn/no-null': 0,
		'unicorn/no-nested-ternary': 0,
		'unicorn/prefer-ternary': 0,
	},
})
