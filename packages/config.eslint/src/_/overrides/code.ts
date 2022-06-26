// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFiles } from '../files.js'

const alreadyHandledByPrettier = {
	'@typescript-eslint/comma-dangle': 0,
	'@typescript-eslint/object-curly-spacing': 0,
	'@typescript-eslint/semi': 0,
	'quote-props': 0,
	semi: 0,
}

const alreadyHandledByTsc = {
	/** Already checked by TSC, can ignore with `_name` underscored variable name */
	'@typescript-eslint/no-unused-vars': 0,
}

const alreadyHandledByUnicorn = {
	/** Handled by `unicorn/prefer-module` */
	'@typescript-eslint/no-var-requires': 0,
}

const functionalRecommendedRules = {
	'@typescript-eslint/prefer-readonly': 2,
	'@typescript-eslint/prefer-readonly-parameter-types': 2,
	'@typescript-eslint/switch-exhaustiveness-check': 2,
	'no-var': 2,
	'prefer-const': 2,
}

/** All TS/JS files */
export const codeOverride = {
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],

	files: codeFiles,

	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},

		ecmaVersion: 'latest',

		project: 'tsconfig.json',
		// TsconfigRootDir: __dirname, //! you may want to override this
		sourceType: 'module',
	},

	plugins: ['@typescript-eslint'],

	rules: {
		...alreadyHandledByPrettier,
		...alreadyHandledByTsc,
		...alreadyHandledByUnicorn,
		...functionalRecommendedRules,

		'@typescript-eslint/no-floating-promises': 2,
		'@typescript-eslint/no-unnecessary-condition': 2,

		// '@typescript-eslint/no-explicit-any': 0,
		// '@typescript-eslint/no-empty-function': 0,

		'arrow-body-style': 2,
		'capitalized-comments': 'off',
		'func-style': ['error', 'declaration'],
		'id-length': 2,
		'init-declarations': 2,
		'line-comment-position': 0,

		'lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true },
		],

		'multiline-comment-style': 0,

		'no-console': 1,
		'no-else-return': 2,
		'no-inline-comments': 0, // we like to comment inline
		'no-magic-numbers': ['error', { ignore: [0, 1] }],
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'no-shadow': 0, // we like to shadow
		'no-ternary': 2,
		'no-underscore-dangle': 2,
		'no-use-before-define': 2,
		'no-void': ['error', { allowAsStatement: true }],
		'no-warning-comments': 0,
		'prefer-arrow-callback': 2,
		'sort-imports': 0, // using `simple-import-sort/imports` instead (auto-fixable)

		'sort-keys': 0, // using `sort-keys-fix` instead (auto-fixable)

		'spaced-comment': ['error', 'always', { markers: ['!', '?'] }], //? allows this
	},
}
