/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	transform: {
		'\\.ts$': '<rootDir>/script/jest.transform.js',
	},
	// moduleNameMapper: {
	// 	'firebase-admin/(.*)': ['firebase-admin/lib/$1'],
	// },
}
