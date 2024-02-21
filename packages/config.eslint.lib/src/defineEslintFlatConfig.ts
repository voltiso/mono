// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EslintFlatConfig } from './EslintFlatConfig'

// export type SingleFlatConfig =
// 	| DeepReadonly<EslintFlatConfig>
// 	| AlsoAccept<PlainObject>

// ! TS 5.3.3: it still helps with editor support to write separate overloads for each number of arguments

export type Constraint<Derived extends Parent, Parent> = Derived & {
	[k in keyof Derived]: k extends keyof Parent ? Derived[k] : never
}

// export type _ConstraintArray<
// 	DerivedItems,
// 	Parent,
// 	Acc extends readonly unknown[],
// > = DerivedItems extends readonly []
// 	? Acc
// 	: DerivedItems extends readonly [infer Head, ...infer Tail]
// 		? _ConstraintArray<Tail, Parent, readonly [_<Constraint<Head, Parent>>, ...Acc]>
// 		: never

// export type ConstraintArray<
// 	DerivedItems extends readonly Parent[],
// 	Parent,
// > = DerivedItems & _ConstraintArray<DerivedItems, Parent, readonly []>

//

export function defineEslintFlatConfig<Config extends EslintFlatConfig>(
	config: Constraint<Config, EslintFlatConfig>,
): [Config]

export function defineEslintFlatConfig<
	ConfigA extends EslintFlatConfig,
	ConfigB extends EslintFlatConfig,
>(
	configA: Constraint<ConfigA, EslintFlatConfig>,
	configB: Constraint<ConfigB, EslintFlatConfig>,
): [ConfigA, ConfigB]

export function defineEslintFlatConfig<
	ConfigA extends EslintFlatConfig,
	ConfigB extends EslintFlatConfig,
	ConfigC extends EslintFlatConfig,
>(
	configA: Constraint<ConfigA, EslintFlatConfig>,
	configB: Constraint<ConfigB, EslintFlatConfig>,
	configC: Constraint<ConfigC, EslintFlatConfig>,
): [ConfigA, ConfigB, ConfigC]

export function defineEslintFlatConfig(
	...configs: EslintFlatConfig[] // ConstraintArray<Configs, EslintFlatConfig>
): EslintFlatConfig[]

//

export function defineEslintFlatConfig<
	Config extends readonly EslintFlatConfig[],
>(...config: Config): Config {
	return config
}

// const a = defineEslintFlatConfig({
// 	rules: {
// 		'no-console': 2,
// 	},

// 	rulesA: {},
// })
