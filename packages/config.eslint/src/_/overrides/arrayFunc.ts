// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const arrayFunc = defineEslintConfigOverride({
	extends: ['plugin:array-func/all'],

	files: ['*'],

	plugins: ['array-func'],

	rules: {
		// 'array-func/from-map': 'error',
		// 'array-func/array-from': 'error',
		// 'array-func/no-unnecessary-this-arg': 'error',
		'array-func/prefer-array-from': 0, // spread operator better!
		// 'array-func/avoid-reverse': 'error',
		// 'array-func/prefer-flat-map': 'error',
		// 'array-func/prefer-flat': 'error',
	},
})
