module.exports = {
	transform: {
		'\\.ts$': 'esbuild-runner/jest',
	},
	moduleNameMapper: {
		'firebase-admin/(.*)': ['firebase-admin/lib/$1'],
	},
}
