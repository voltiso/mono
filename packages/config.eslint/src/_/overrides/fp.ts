// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFiles } from '../files.js'

/** `eslint-plugin-fp` - functional programming */
export const fpOverride = {
	extends: ['plugin:fp/recommended'],

	files: codeFiles,

	plugins: ['fp'],

	rules: {
		'fp/no-arguments': 'error',
		'fp/no-class': 'error',
		'fp/no-delete': 'error',
		'fp/no-events': 'error',
		'fp/no-get-set': 'error',
		'fp/no-let': 'error',
		'fp/no-loops': 'error',
		'fp/no-mutating-assign': 'error',
		'fp/no-mutating-methods': 'error',

		'fp/no-mutation': [
			'error',
			{
				allowThis: true,
				commonjs: true,
			},
		],

		'fp/no-nil': 'error',
		'fp/no-proxy': 'error',
		'fp/no-rest-parameters': 'error',
		'fp/no-this': 'error',
		'fp/no-throw': 'error',
		'fp/no-unused-expression': ['error', { allowUseStrict: true }],
		'fp/no-valueof-field': 'error',
		'no-var': 'error',
	},
}
