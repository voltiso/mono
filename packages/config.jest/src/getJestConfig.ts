// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// // eslint-disable-next-line import/no-unassigned-import, sonarjs/no-implicit-dependencies
// import 'tsx'

import * as path from 'node:path'

import {
	codeFilesExtensions,
	defineJestConfig,
	moduleNameMapper,
} from '@voltiso/config.jest.lib'
// import { register as registerEsbuild } from 'esbuild-register/dist/node'

// let registerEsbuildOnce = () => {
// 	registerEsbuild()
// 	// eslint-disable-next-line @typescript-eslint/no-empty-function
// 	registerEsbuildOnce = () => {}
// }

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

// eslint-disable-next-line unicorn/prefer-module
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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getJestConfig(options?: {
	format?: 'cjs' | 'esm' | undefined
}) {
	const transform: Record<string, string> = {}

	const transformFileName = options?.format ?? 'default'

	const transformValue = path.join(
		dirname,
		// '..',
		// 'cjs', // !
		'transform',
		`${transformFileName}.js`,
	)

	for (const extension of codeFilesExtensions) {
		// eslint-disable-next-line unicorn/prefer-string-raw
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
			// eslint-disable-next-line unicorn/prefer-string-raw
			`node_modules/\\.pnpm/(?!${librariesToTransform.join('|')}).*`,
		],

		transform,

		injectGlobals: false, // import from `@jest/globals`

		setupFilesAfterEnv: [
			// path.join(
			// 	dirname,
			// 	// ! Jest in ESM mode by default wants this in CJS format?!
			// 	// ! probably not needed if user has `--experimental-vm-modules` flag
			// 	// '..',
			// 	// 'cjs',
			// 	'setup-after-env.js',
			// ),
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
			// registerEsbuildOnce()
			return Reflect.get(target, prop, receiver) as never
		},
	})
}
