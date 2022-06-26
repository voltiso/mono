// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFiles } from '../files.js'

export const putoutOverride = {
	extends: ['plugin:putout/recommended'],

	files: codeFiles,

	plugins: ['putout'],

	rules: {
		'putout/add-newline-after-function-call': 'error',
		'putout/add-newline-before-function-call': 'error',
		'putout/add-newlines-between-specifiers': 'error',
		'putout/add-newlines-between-types-in-union': 'error',
		'putout/align-spaces': 'error',
		'putout/array-element-newline': 0,
		'putout/destructuring-as-function-argument': 'error',
		'putout/function-declaration-paren-newline': 'error',
		'putout/keyword-spacing': 'error',
		'putout/long-properties-destructuring': 'error',
		'putout/multiple-properties-destructuring': 'error',
		'putout/newline-function-call-arguments': 'error',
		'putout/object-property-newline': 'error',
		'putout/objects-braces-inside-array': 0,

		'putout/putout': [
			'error',
			{ rules: { 'remove-console': 'off', 'remove-unused-variables': 'off' } },
		],

		'putout/remove-empty-newline-after-import': 'error',
		'putout/remove-empty-newline-after-last-element': 'error',
		'putout/remove-empty-newline-after-last-specifier': 'error',
		'putout/remove-empty-newline-before-first-specifier': 'error',
		'putout/remove-empty-specifiers': 'error',
		'putout/remove-newline-after-default-import': 'error',
		'putout/remove-newline-from-empty-object': 'error',
		'putout/single-property-destructuring': 'error',
		'putout/tape-add-newline-before-assertion': 'error',
		'putout/tape-add-newline-between-tests': 'error',
		'putout/tape-remove-newline-before-t-end': 'error',
	},
}
