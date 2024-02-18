// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Config } from 'prettier'

/**
 * Helper for TS type inference.
 *
 * - Does nothing at runtime.
 *
 * @example
 *
 * ```ts
 * const myConfig = defineConfig({
 * 	semi: true,
 * })
 * ```
 *
 * @param config - `prettier` config.
 * @returns `config` unchanged.
 */
export function defineConfig<C extends Config>(config: Readonly<C>): C {
	return config
}
