// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

// @ts-expect-error no typings
import putout from 'eslint-plugin-putout'

export const putoutOverride = defineEslintConfigOverride({
	files: codeFiles,

	// plugins: ['putout'],
	plugins: { putout },

	// extends: ['plugin:putout/recommended'], // disables some eslint rules that we want

	rules: {
		'putout/add-newline-after-function-call': 0, // why?
		'putout/add-newline-before-function-call': 1,
		'putout/add-newlines-between-specifiers': 0, // conflicts with imports sort
		'putout/add-newlines-between-types-in-union': 0, // conflicts with prettier
		'putout/add-newline-before-return': 0, // broken?
		'putout/align-spaces': 0, // not sure? conflicts with prettier probably
		'putout/array-element-newline': 0,
		'putout/function-declaration-paren-newline': 0,
		'putout/keyword-spacing': 0, // conflicts with prettier
		'putout/newline-function-call-arguments': 0,
		'putout/object-property-newline': 0, // not sure about this one - prettier accepts both
		'putout/objects-braces-inside-array': 0,

		'putout/destructuring-as-function-argument': 0,
		'putout/long-properties-destructuring': 0, // conflicts with prettier
		'putout/multiple-properties-destructuring': 0,
		'putout/single-property-destructuring': 0,

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
		'putout/remove-empty-newline-after-last-element': 1,
		'putout/remove-empty-newline-after-last-specifier': 0, // handled by prettier
		'putout/remove-empty-newline-before-first-specifier': 0, // handled by prettier
		'putout/remove-empty-specifiers': 1,
		'putout/remove-newline-after-default-import': 1,
		'putout/remove-newline-from-empty-object': 1,
		'putout/tape-add-newline-before-assertion': 1,
		'putout/tape-add-newline-between-tests': 1,
		'putout/tape-remove-newline-before-t-end': 1,
		'putout/nonblock-statement-body-newline': 0,
	},
} as const)
