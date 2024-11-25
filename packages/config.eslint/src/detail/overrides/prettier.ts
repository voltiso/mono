// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import prettier from 'eslint-plugin-prettier'

// import { codeFiles } from '~/_/files'

export const prettierConfig = defineEslintFlatConfig({
	// files: ['*'],

	/**
	 * Do not use prettier for JS/TS, because it does not allow for
	 * `putout/align-spaces`
	 */
	// ignores: codeFiles,

	plugins: { prettier },

	// extends: ['plugin:prettier/recommended'],

	rules: {
		...getAllRules(prettier as never, 'prettier', 'warn'),
		// 'prettier/prettier': 1,

		quotes: 0,
		'no-tabs': 0,
		'comma-dangle': 0,
		'max-len': 0,
		'space-before-function-paren': 0,
		'padded-blocks': 0,
		'function-call-argument-newline': 0,
		curly: 0,
		'lines-around-comment': 0,
		'function-paren-newline': 0,
		'wrap-regex': 0,
		'dot-location': 0,
		'arrow-parens': 0,
		'array-element-newline': 0,
		'implicit-arrow-linebreak': 0,
		'func-call-spacing': 0,
		'object-property-newline': 0,
		'no-extra-parens': 0,
		'multiline-ternary': 0,
		'no-mixed-operators': 0,
		'array-bracket-newline': 0,
		'semi-style': 0,
	},
})
