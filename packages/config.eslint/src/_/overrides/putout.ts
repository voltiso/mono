// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/_/files'

export const putoutOverride = defineEslintConfigOverride({
	extends: ['plugin:putout/recommended'],

	files: codeFiles,

	plugins: ['putout'],

	rules: {
		'putout/add-newline-after-function-call': 'error',
		'putout/add-newline-before-function-call': 'error',
		'putout/add-newlines-between-specifiers': 0, // conflicts with imports sort
		'putout/add-newlines-between-types-in-union': 0, // conflicts with prettier
		'putout/add-newline-before-return': 0, // broken?
		'putout/align-spaces': 'error',
		'putout/array-element-newline': 0,
		'putout/destructuring-as-function-argument': 0,
		'putout/function-declaration-paren-newline': 0,
		'putout/keyword-spacing': 0, // conflicts with prettier
		'putout/long-properties-destructuring': 0, // conflicts with prettier
		'putout/multiple-properties-destructuring': 0,
		'putout/newline-function-call-arguments': 0,
		'putout/object-property-newline': 0, // not sure about this one - prettier accepts both
		'putout/objects-braces-inside-array': 0,

		// 'putout/putout': [
		// 	'error',
		// 	{
		// 		rules: {
		// 			'remove-console': 'off',
		// 			'remove-unused-variables': 'off',
		// 			'new/remove-useless': 'off',
		// 			'convert-typeof-to-is-type': 'off',
		// 			'remove-empty/block': 'off', // already handled by different rules
		// 		},
		// 	},
		// ],

		// `putout/putout` broken! //! TypeError: Error while loading rule 'putout/putout': Property literal of TSLiteralType expected node to be of a type ["NumericLiteral","StringLiteral","BooleanLiteral","BigIntLiteral"] but instead got "CallExpression"
		// in `IsNegative.ts`

		'putout/putout': 0,

		'putout/remove-empty-newline-after-import': 0,
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
		'putout/nonblock-statement-body-newline': 0,
	},
} as const)
