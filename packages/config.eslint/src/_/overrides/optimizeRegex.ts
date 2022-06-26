export const optimizeRegex = {
	files: ['*'],

	plugins: ['optimize-regex'],

	// extends: ['optimize-regex/recommended'],
	// extends: ['optimize-regex/all'],

	
	rules: {
		'optimize-regex/optimize-regex': 2,
	},
}
