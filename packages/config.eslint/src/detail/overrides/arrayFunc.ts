// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import arrayFuncPlugin from 'eslint-plugin-array-func'

import { codeFiles } from '../files'

export const arrayFunc = defineEslintFlatConfig({
	// extends: ['plugin:array-func/all'],

	files: codeFiles,

	// plugins: ['array-func'],
	plugins: {
		'array-func': arrayFuncPlugin as never,
	},

	rules: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		...(arrayFuncPlugin.configs.all.rules as {}),

		'array-func/from-map': 1,
		'array-func/no-unnecessary-this-arg': 1,
		'array-func/prefer-array-from': 0, // spread operator better!
		'array-func/avoid-reverse': 1,
		'array-func/prefer-flat-map': 1,
		'array-func/prefer-flat': 1,
	},
})
