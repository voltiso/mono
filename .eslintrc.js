module.exports = {
	root: true,
	env: {
		es6: true,
		node: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:jest/all',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: 'tsconfig.lint.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	ignorePatterns: ['dist/**/*', 'node_modules'],
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		// 'import/no-unresolved': 0,
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-floating-promises': 'error',

		'jest/prefer-lowercase-title': 0,
	},
}
