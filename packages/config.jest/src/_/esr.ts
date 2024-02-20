// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable unicorn/prefer-module */

import * as path from 'node:path'

import { codeFilesExtensions } from '@voltiso/config.jest.lib'

//

const transform: Record<string, string> = {}

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

for (const extension of codeFilesExtensions) {
	transform[`\\.${extension}$`] = path.join(dirname, '..', 'transform.js')
	// require.resolve('../transform.js')
	// '@voltiso/config.jest/transform'
}

const librariesToTransform = [
	// 'get-port',
	'react-native',
	'@react-native',
	//
	// '@voltiso/localstore'
]

export const testMatch = [
	'**/__tests__/**/*.?([cm])[jt]s?(x)',
	'**/?(*.)+(spec|test).?([cm])[tj]s?(x)',
]

// testEnvironment: require.resolve('jest-environment-jsdom'), // 'jsdom',
export const testEnvironment = 'node'

export const modulePathIgnorePatterns = ['dist/', '.tsc-out/', '.next/']

export const transformIgnorePatterns = [
	`node_modules/\\.pnpm/(?!${librariesToTransform.join('|')}).*`,
]

export { transform }

// console.log('!!!', path.join(dirname, '..', 'setup-after-env.js'))

export const setupFilesAfterEnv = [
	path.join(dirname, '..', 'setup-after-env.js'),
	// require.resolve('../setup-after-env.js'),
	// '@voltiso/config.jest/setup-after-env',
]

/** For react-native */
export const haste = {
	defaultPlatform: 'ios',
	platforms: ['android', 'ios', 'native'],
}

export { moduleNameMapper } from '@voltiso/config.jest.lib'

const isCjs = typeof require === 'function'
// console.log('config.jest', isCjs ? 'cjs' : 'esm')
// console.log({dirname})

export const extensionsToTreatAsEsm = isCjs ? [] : ['.ts', '.tsx']
