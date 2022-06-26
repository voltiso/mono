export const cypress = {
	files: ['*'],

	plugins: ['cypress'],

	extends: ['plugin:cypress/recommended'],

	rules: {
		'cypress/no-assigning-return-values': 'error',
		'cypress/no-unnecessary-waiting': 'error',
		'cypress/assertion-before-screenshot': 'warn',
		'cypress/no-force': 'warn',
		'cypress/no-async-tests': 'error',
		'cypress/no-pause': 'error',
	},
}
