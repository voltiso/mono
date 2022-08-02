// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineJestConfig, moduleNameMapper } from '@voltiso/config.jest.lib'

const esModules = ['react-native', '@react-native']

export const jestReactConfig = defineJestConfig({
	// preset: 'ts-jest/presets/js-with-babel',
	preset: 'react-native',
	// transform: {
	// 	'\\.ts$': 'esbuild-runner/jest',
	// 	'\\.tsx$': 'esbuild-runner/jest',
	// },
	testEnvironment: 'jsdom',
	modulePathIgnorePatterns: ['dist'],

	setupFilesAfterEnv: [
		// eslint-disable-next-line github/unescaped-html-literal
		'<rootDir>/node_modules/@voltiso/config.jest.react/dist/cjs/setup-after-env.js',
	],
	// setupFilesAfterEnv: ['<rootDir>/script/jest-setup.ts'],

	transformIgnorePatterns: [
		`node_modules/\\.pnpm/(?!${esModules.join('|')}).*`,
	],
	// globals: {
	// 	__DEV__: true,
	// },

	moduleNameMapper,

	// globals: {
	// 	'ts-jest': {
	// 		babelConfig:
	// 			'node_modules/@voltiso/config.jest.react/dist/cjs/babel.config.js',
	// 	},
	// },

	// moduleNameMapper: {
	// 	'../Utilities/Platform': '../Utilities/Platform.ios',
	// },
} as const)
