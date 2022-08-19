// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	codeFilesExtensions,
	defineJestConfig,
	moduleNameMapper,
} from '@voltiso/config.jest.lib'

/* eslint-disable unicorn/prefer-module */

//

const transform: Record<string, string> = {}

for (const extension of codeFilesExtensions) {
	transform[`\\.${extension}$`] =
		// require.resolve('esbuild-jest')
		require.resolve('../transform.js')
	// './node_modules/@voltiso/config.jest.esr/dist/cjs/transform.js'
}

const librariesToTransform = [
	// 'get-port',
	'react-native',
	'@react-native',
	//
]

export const jestEsrConfig = defineJestConfig({
	testMatch: [
		'**/__tests__/**/*.?([cm])[jt]s?(x)',
		'**/?(*.)+(spec|test).?([cm])[tj]s?(x)',
	],

	testEnvironment: require.resolve('jest-environment-jsdom'), // 'jsdom',
	// testEnvironment: 'node',

	modulePathIgnorePatterns: ['dist/', '.tsc-out/', '.next/'],

	transformIgnorePatterns: [
		`node_modules/\\.pnpm/(?!${librariesToTransform.join('|')}).*`,
	],

	moduleNameMapper,
	transform,

	setupFilesAfterEnv: [
		require.resolve('../setup-after-env.js'),
		require.resolve('react-native/jest/setup'),
	],

	/** For react-native */
	haste: {
		defaultPlatform: 'ios',
		platforms: ['android', 'ios', 'native'],
	},

	// globals: {
	// 	__DEV__: true, // for `react-native`
	// },
} as const)
