/** @type {import('eslint').Linter.Config} */
module.exports = {
	// root: true, // better override this explicitly
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:all',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jest/all',
		// 'plugin:json/recommended',
		'plugin:jsonc/recommended-with-jsonc',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.eslint.json',
		// tsconfigRootDir: __dirname, //! you may want to overwrite this
		sourceType: 'module',
		// extraFileExtensions: ['json'],
	},
	ignorePatterns: [
		'!.*', // lint hidden stuff (un-ignore)
		'dist/',
		'node_modules/',
		'.tsc-out/',
		//
	],
	plugins: ['@typescript-eslint', 'import', 'json', 'prettier', 'jest'],
	rules: {
		'json/*': 2,

		// 'import/no-unresolved': 0,
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-floating-promises': 'error',

		'jest/prefer-lowercase-title': 0, // why...

		'@typescript-eslint/no-unused-vars': 0, // already checked by TSC, can ignore with `_name` underscored variable name
		// '@typescript-eslint/no-explicit-any': 0,
		// '@typescript-eslint/no-empty-function': 0,

		// eslint:all
		'sort-keys': 0, // bad idea
		'multiline-comment-style': 0,
		'func-style': ['error', 'declaration'], // declarations can have overloads <3
		'no-else-return': 0,
		'lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true },
		],
		'no-void': ['error', { allowAsStatement: true }],
		'one-var': 0,
		'no-underscore-dangle': 0, // ['error', { allowAfterThis: true }],
		'line-comment-position': 0, // ['error', { position: 'beside' }],
		'no-inline-comments': 0,
		'new-cap': ['error', { capIsNew: false }],
		'no-use-before-define': 0,
		'capitalized-comments': 0,
		'sort-imports': 0,
		'no-magic-numbers': ['error', { ignore: [0, 1] }],
		'no-shadow': 0,
		'init-declarations': 0,
		'max-lines-per-function': 0,
		'id-length': 0,
		'no-ternary': 0,
		'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
		'no-warning-comments': 0, // meh
		'no-console': 1,
	},
}
