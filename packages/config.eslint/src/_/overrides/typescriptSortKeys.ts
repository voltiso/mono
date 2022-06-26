export const typescriptSortKeys = {
	files: ['*'],

	plugins: ['typescript-sort-keys'],

	extends: ['plugin:typescript-sort-keys/recommended'],

	rules: {
		'typescript-sort-keys/interface': 'error',
		'typescript-sort-keys/string-enum': 'error',
	},
}
