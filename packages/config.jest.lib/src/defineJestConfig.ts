// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Config as JestConfig } from 'jest'

// /**
//  * `DeepMutable` without type constraint
//  *
//  * ! copied-over from `@voltiso/util` to avoid cyclic deps
//  */
// type DeepMutable_<T> = {
// 	-readonly [k in keyof T]: DeepMutable_<T[k]>
// }

// /**
//  * `DeepReadonly` without type constraint
//  *
//  * ! copied-over from `@voltiso/util` to avoid cyclic deps
//  */
// type DeepReadonly_<T> = {
// 	readonly [k in keyof T]: DeepReadonly_<T[k]>
// }

export type Constraint<Derived extends Parent, Parent> = Derived & {
	[k in keyof Derived]: k extends keyof Parent ? Derived[k] : never
}

/**
 * Define new `jest` config - util for type inference (no-op at runtime)
 *
 * @example
 *
 * ```ts
 * const jestConfig = defineJestConfig({
 * 	preset: 'react-native',
 * 	testEnvironment: 'jsdom',
 * 	modulePathIgnorePatterns: ['dist'],
 * } as const)
 * ```
 *
 * @param config - New jest config - define in-place
 * @returns `config` (no-op)
 */
export function defineJestConfig<Config extends JestConfig>(
	config: Constraint<Config, JestConfig>,
): Config {
	return config
}

// const a = defineJestConfig({
// 	preset: 'test',

// 	testEnvironmentA: 'test',
// })
