// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { VoltisoError } from '_/error/VoltisoError'

import { lazyFunction } from '~/lazy/lazyFunction'

async function importJest() {
	// eslint-disable-next-line turbo/no-undeclared-env-vars, n/no-process-env
	if (process.env['NODE_ENV'] !== 'test') return null
	// eslint-disable-next-line import/dynamic-import-chunkname, promise/prefer-await-to-then
	return import(/* webpackIgnore: true */ '@jest/globals').catch(
		// eslint-disable-next-line promise/prefer-await-to-callbacks
		(error: unknown) => {
			throw error // explicit `.catch` allows esbuild to properly transpile it to fail at runtime only
		},
	)
}

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
let jestModule: typeof import('@jest/globals') | null = null
let jestError: unknown | null = null

importJest()
	// eslint-disable-next-line promise/always-return
	.then(jest => {
		jestModule = jest
	})
	// eslint-disable-next-line unicorn/prefer-top-level-await, promise/prefer-await-to-callbacks
	.catch((error: unknown) => {
		jestError = error
	})

// // eslint-disable-next-line @typescript-eslint/consistent-type-imports
// let jest: typeof import('@jest/globals') = null as never
// // eslint-disable-next-line sonarjs/no-redundant-type-constituents
// let jestError: unknown | null = null
// try {
// 	// eslint-disable-next-line es-x/no-top-level-await, import/dynamic-import-chunkname
// 	jest = await import('@jest/globals')
// } catch (error) {
// 	jestError = error
// }

/**
 * @internal This is not tested, just an idea
 *
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export const $expect: typeof import('@jest/globals').expect = lazyFunction(
	() => {
		// eslint-disable-next-line @typescript-eslint/only-throw-error, rxjs/throw-error
		if (jestError) throw jestError
		// eslint-disable-next-line sonarjs/no-duplicate-string
		if (!jestModule) throw new VoltisoError('`@jest/globals` not loaded')
		return jestModule.expect
	},
)

/**
 * @internal This is not tested, just an idea
 *
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export const $describe: typeof import('@jest/globals').describe = lazyFunction(
	() => {
		// eslint-disable-next-line @typescript-eslint/only-throw-error, rxjs/throw-error
		if (jestError) throw jestError
		if (!jestModule) throw new VoltisoError('`@jest/globals` not loaded')
		return jestModule.describe
	},
)

/**
 * @internal This is not tested, just an idea
 *
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export const $it: typeof import('@jest/globals').it = lazyFunction(() => {
	// eslint-disable-next-line @typescript-eslint/only-throw-error, rxjs/throw-error
	if (jestError) throw jestError
	if (!jestModule) throw new VoltisoError('`@jest/globals` not loaded')
	return jestModule.it
})

/**
 * @deprecated Use `$it` instead
 * @internal This is not tested, just an idea
 * @strip Use `@voltiso/transform/strip` to strip from production code
 */
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
export const $test: typeof import('@jest/globals').test = lazyFunction(() => {
	// eslint-disable-next-line @typescript-eslint/only-throw-error, rxjs/throw-error
	if (jestError) throw jestError
	if (!jestModule) throw new VoltisoError('`@jest/globals` not loaded')
	return jestModule.test
})
