export const jsx = {
	files: ['*'],

	plugins: ['jsx'],

	rules: {
		'jsx/uses-factory': [1, { pragma: 'JSX' }],
		'jsx/factory-in-scope': [1, { pragma: 'JSX' }],
		'jsx/mark-used-vars': 1,
		'jsx/no-undef': 1,
	},
}
