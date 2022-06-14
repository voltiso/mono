// ts-jest config to make `zone.js` work

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
	preset: 'ts-jest/presets/js-with-babel',
	testEnvironment: 'node',
	modulePathIgnorePatterns: [
		'/dist/',
		'src/_modules/compiler-options/', // do not run compiler-options static checks with ts-jest (checked by `pnpm lint:tsc`)
		//
	],
	globals: {
		'ts-jest': {
			babelConfig: 'test/babel.config.js',
		},
	},
}

// old config for esbuild-runner - not working perfectly with zone.js
// see git history for the `script/jest.transform.js` file

// /** @type {import('@jest/types').Config.InitialOptions} */
// module.exports = {
// 	transform: {
// 		'\\.ts$': '<rootDir>/script/jest.transform.js',
// 	},
// }
