// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Config as JestConfig } from 'jest'

/**
 * `DeepMutable` without type constraint
 *
 * ! copied-over from `@voltiso/util` to avoid cyclic deps
 */
type DeepMutable_<T> = {
	-readonly [k in keyof T]: DeepMutable_<T[k]>
}

/**
 * `DeepReadonly` without type constraint
 *
 * ! copied-over from `@voltiso/util` to avoid cyclic deps
 */
type DeepReadonly_<T> = {
	readonly [k in keyof T]: DeepReadonly_<T[k]>
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
export function defineJestConfig<Config extends DeepReadonly_<JestConfig>>(
	config: Config,
): DeepMutable_<Config> {
	return config as never
}
