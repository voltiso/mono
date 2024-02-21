// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/prefer-module */

import * as path from 'node:path'

import {
	codeFilesExtensions,
	defineJestConfig,
	moduleNameMapper,
} from '@voltiso/config.jest.lib'
import { register as registerEsbuild } from 'esbuild-register/dist/node'

let registerEsbuildOnce = () => {
	registerEsbuild()
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	registerEsbuildOnce = () => {}
}

// const dirname =
// 	typeof import.meta !== 'undefined'
// 		? path.dirname(new URL(import.meta.url).pathname)
// 		: typeof __dirname !== 'undefined'
// 			? __dirname
// 			: ''

// console.log('!!!', new URL('.', import.meta.url).pathname.slice(0, -1))
// console.log('!!!', __dirname)

// let dirname

// try {
// 	dirname = __dirname
// }
// catch {
// 	dirname = new URL('.', import.meta.url).pathname.slice(0, -1)
// }

const dirname = __dirname // will be transpiled to `import.meta...` by `@voltiso/transform/compat

const librariesToTransform = [
	// 'get-port',
	'react-native',
	'@react-native',
	//
	// '@voltiso/localstore'
]

// const isCjs = typeof require === 'function'
// console.log('config.jest', isCjs ? 'cjs' : 'esm')
// console.log({dirname})

export function getJestConfig(options?: { format?: 'cjs' | 'esm' }) {
	const transform: Record<string, string> = {}

	const transformFileName = options?.format ?? 'default'

	const transformValue = path.join(
		dirname,
		'transform',
		`${transformFileName}.js`,
	)

	for (const extension of codeFilesExtensions) {
		transform[`\\.${extension}$`] = transformValue
		// require.resolve('../transform.js')
		// '@voltiso/config.jest/transform'
	}

	const config = defineJestConfig({
		testMatch: [
			'**/__tests__/**/*.?([cm])[jt]s?(x)',
			'**/?(*.)+(spec|test).?([cm])[tj]s?(x)',
		],

		// testEnvironment: require.resolve('jest-environment-jsdom'), // 'jsdom',
		testEnvironment: 'node',

		modulePathIgnorePatterns: ['dist/', '.tsc-out/', '.next/'],

		transformIgnorePatterns: [
			`node_modules/\\.pnpm/(?!${librariesToTransform.join('|')}).*`,
		],

		transform,

		setupFilesAfterEnv: [
			path.join(dirname, 'setup-after-env.js'),
			// require.resolve('../setup-after-env.js'),
			// '@voltiso/config.jest/setup-after-env',
		],

		/** For react-native */
		haste: {
			defaultPlatform: 'ios',
			platforms: ['android', 'ios', 'native'],
		},

		moduleNameMapper,

		// assume ESM here if no format is provided
		extensionsToTreatAsEsm: options?.format === 'cjs' ? [] : ['.ts', '.tsx'],
	})

	return new Proxy(config, {
		get(target, prop, receiver) {
			registerEsbuildOnce()
			return Reflect.get(target, prop, receiver) as never
		},
	})
}
