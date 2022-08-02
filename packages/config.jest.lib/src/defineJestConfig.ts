// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Config as JestConfig } from 'jest'

import type { DeepMutable } from './_symlinks/DeepMutable'
import type { DeepReadonly } from './_symlinks/DeepReadonly'

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
export function defineJestConfig<Config extends DeepReadonly<JestConfig>>(
	config: Config,
): DeepMutable<Config> {
	return config as never
}
