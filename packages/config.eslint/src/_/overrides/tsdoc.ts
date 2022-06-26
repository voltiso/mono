export const tsdoc = {
	files: ['*'],

	plugins: ['tsdoc'],
	extends: ['plugin:@typescript-eslint/recommended'],

	rules: {
		'tsdoc/syntax': 2,
	},
}
