module.exports = {
	root: true,
	env: {
		// node: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:prettier/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: ['tsconfig.json', 'tsconfig.dev.json'],
		tsconfigRootDir: __dirname,
		sourceType: 'module',
	},
	ignorePatterns: [
		'.eslintrc.js',
		'lib/**/*', // ignore built files
	],
	plugins: ['@typescript-eslint', 'import'],
	rules: {
		'import/no-unresolved': 0,
		'@typescript-eslint/no-unnecessary-condition': 'error',
		'@typescript-eslint/no-floating-promises': 'error',
		//
		// '@typescript-eslint/no-unsafe-call': 1,
		// '@typescript-eslint/no-unsafe-argument': 1,
		// '@typescript-eslint/no-unsafe-member-access': 1,
		// '@typescript-eslint/no-unsafe-assignment': 1,
	},
	settings: {
		'import/parsers': {
			[require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
		},
		'import/resolver': {
			[require.resolve('eslint-import-resolver-node')]: {
				extensions: [],
			},
		},
	},
}
