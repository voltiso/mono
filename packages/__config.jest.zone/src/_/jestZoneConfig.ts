// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineJestConfig } from '@voltiso/config.jest.lib'

/**
 * `ts-jest` config to make `zone.js` work
 *
 *     import('ts-jest').InitialOptionsTsJest
 */
export const jestZoneConfig = defineJestConfig({
	preset: 'ts-jest/presets/js-with-babel',
	testEnvironment: 'node',

	modulePathIgnorePatterns: [
		'/dist/',
		// '/src/compiler-options/', // do not run compiler-options static checks with ts-jest (checked by `pnpm lint:tsc`)
		//
	],

	moduleNameMapper: {
		'^(\\..+)\\.js$': '$1',
	},

	globals: {
		'ts-jest': {
			babelConfig: 'node_modules/@voltiso/config.babel.zone/dist/cjs/index.js',
		},
	},
})
