export const chaiFriendly = {
	files: ['*'],

	plugins: ['chai-friendly'],

	extends: ['plugin:chai-friendly/recommended'],

	rules: {
		'no-unused-expressions': 0, // disable original no-unused-expressions
		'chai-friendly/no-unused-expressions': 2, // enable chai-friendly one
	},
}
