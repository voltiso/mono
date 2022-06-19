/**
 * `ts-jest` config to make `zone.js` work
 * @type {import('ts-jest').InitialOptionsTsJest}
 * */
module.exports = {
	preset: 'ts-jest/presets/js-with-babel',
	testEnvironment: 'node',
	modulePathIgnorePatterns: [
		'/dist/',
		// '/src/compiler-options/', // do not run compiler-options static checks with ts-jest (checked by `pnpm lint:tsc`)
		//
	],
	globals: {
		'ts-jest': {
			babelConfig: 'node_modules/@voltiso/config.babel.zone',
		},
	},
}
