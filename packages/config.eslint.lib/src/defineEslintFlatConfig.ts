// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EslintFlatConfig } from './EslintFlatConfig'

// export type SingleFlatConfig =
// 	| DeepReadonly<EslintFlatConfig>
// 	| AlsoAccept<PlainObject>

// ! TS 5.3.3: it still helps with editor support to write separate overloads for each number of arguments

export function defineEslintFlatConfig<Config extends EslintFlatConfig>(
	config: Config & EslintFlatConfig,
): [Config]

export function defineEslintFlatConfig<
	ConfigA extends EslintFlatConfig,
	ConfigB extends EslintFlatConfig,
>(
	configA: ConfigA & EslintFlatConfig,
	configB: ConfigB & EslintFlatConfig,
): [ConfigA, ConfigB]

export function defineEslintFlatConfig<
	Config extends readonly EslintFlatConfig[],
>(...config: Config): Config

//

export function defineEslintFlatConfig<
	Config extends readonly EslintFlatConfig[],
>(...config: Config): Config {
	return config
}

// const a = defineEslintFlatConfig({
// 	rules: {},
// 	// rules: {
// 	// 	'no-console': 2,
// 	// }
// })
