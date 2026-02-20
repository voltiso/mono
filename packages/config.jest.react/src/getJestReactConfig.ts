// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import * as path from 'node:path'

import { getJestConfig } from '@voltiso/config.jest'
import type { Config } from 'jest'
import resolve from 'resolve'

const dirname = __dirname // will be transpiled to `import.meta...` by `@voltiso/transform/compat

// 1. Resolve RN setup once, but don't apply it yet
let reactNativeSetup: string | undefined

try {
	reactNativeSetup = resolve.sync('react-native/jest/setup', {
		basedir: '.',
	})
} catch {
	// console.log('react-native/jest/setup not found')
}

//

function getJestReactWebConfig(options: {
	format?: 'cjs' | 'esm' | undefined
}) {
	const baseConfig = getJestConfig(options)
	const setupFilesAfterEnv = [
		...baseConfig.setupFilesAfterEnv,
		path.join(dirname, 'dom-setup-after-env.js'),
		path.join(dirname, 'react-setup-after-env.js'),
	]

	// --- WEB MODE (Default/Fallthrough) ---
	const config = {
		...baseConfig,

		testEnvironment: resolve.sync('jest-environment-jsdom', {
			basedir: dirname,
		}),

		setupFilesAfterEnv,

		// // 4. Critical Fix: Map 'react-native' to 'react-native-web'
		// // This prevents your code from importing real RN and crashing JSDOM
		// moduleNameMapper: {
		// 	...baseConfig.moduleNameMapper,
		// 	'^react-native$': 'react-native-web',
		// },
	} satisfies Config

	// console.log('!!!', config)

	return config
}

function getJestReactNativeConfig(options: {
	format?: 'cjs' | 'esm' | undefined
}) {
	const baseConfig = getJestConfig(options)
	const setupFilesAfterEnv = [
		...baseConfig.setupFilesAfterEnv,
		path.join(dirname, 'react-setup-after-env.js'),
	]

	// Only add the heavy RN setup if we are definitely in Native mode
	if (reactNativeSetup) {
		setupFilesAfterEnv.push(reactNativeSetup)
	}

	const config = {
		...baseConfig,
		// preset: 'react-native', // Use official preset for transforms/mocks
		testEnvironment: 'node', // Native tests run in Node (preset handles globals)
		setupFilesAfterEnv,
		injectGlobals: true, // react-native's setup scripts require globals (old fashioned)
		// transform: {
		// 	'^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Ensure we transform your TS/JS
		// },
		// Native specific ignores to compile node_modules
		// transformIgnorePatterns: [
		// 	'node_modules/(?!(jest-)?react-native|@react-native|@react-native-community|@react-navigation)',
		// ],

		moduleNameMapper: {
			...baseConfig.moduleNameMapper,

			// TODO: fix styler so that it does not require mock via global import
			'^next/navigation$': path.join(
				dirname,
				'..',
				options.format ?? 'esm',
				'universalMock.js',
			),
		},
	} satisfies Config

	return config
}

const defaultOptions = {
	format: 'esm',
	mode: 'web',
} as const

export function getJestReactConfig(
	options: {
		format?: 'cjs' | 'esm' | undefined
		mode?: 'web' | 'native' | undefined
	} = defaultOptions,
): Config {
	if (options.mode === 'native') {
		return getJestReactNativeConfig(options)
	}

	return getJestReactWebConfig(options)
}
