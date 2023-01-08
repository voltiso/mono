// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '../files'

export const arrayFunc = defineEslintConfigOverride({
	extends: ['plugin:array-func/all'],

	files: codeFiles,

	plugins: ['array-func'],

	rules: {
		'array-func/from-map': 1,
		'array-func/no-unnecessary-this-arg': 1,
		'array-func/prefer-array-from': 0, // spread operator better!
		'array-func/avoid-reverse': 1,
		'array-func/prefer-flat-map': 1,
		'array-func/prefer-flat': 1,
	},
} as const)
