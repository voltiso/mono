// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ConfigFunction, TransformOptions } from '@babel/core'

import type { DeepMutable } from './_/DeepMutable.js'
import type { DeepReadonly } from './_/DeepReadonly.js'

type MyDeepMutable<X> = X extends (...args: infer Args) => infer R
	? (...args: Args) => DeepMutable<R>
	: DeepMutable<X>

type MyDeepReadonly<X> = X extends (...args: infer Args) => infer R
	? (...args: Args) => DeepReadonly<R>
	: DeepReadonly<X>

type BabelConfig = TransformOptions | ConfigFunction

/**
 * Define new `jest` config - util for type inference (no-op at runtime)
 *
 * @example
 *
 * ```ts
 * const babelZoneConfig = defineBabelConfig({
 * 	plugins: ['@babel/plugin-transform-async-to-generator'], // to make zone.js work
 * } as const)
 * ```
 *
 * @param config - New jest config - define in-place
 * @returns `config` (no-op)
 */
export function defineBabelConfig<Config extends MyDeepReadonly<BabelConfig>>(
	config: Config,
): MyDeepMutable<Config> {
	return config as never
}
