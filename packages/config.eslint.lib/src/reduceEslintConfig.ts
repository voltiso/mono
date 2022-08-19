// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EslintConfig, EslintConfigOverride } from './EslintConfig'

export declare namespace ReduceEslintConfig {
	export type Options = {
		/**
		 * Pick only config that mentions `pluginsToPick`
		 *
		 * @defaultValue `undefined` = pick all
		 */
		pluginsToPick?: string[] | undefined
	}
}

export function reduceRules<Rules extends EslintConfig['rules']>(
	rules: Rules,
	options: ReduceEslintConfig.Options,
): Rules {
	if (!options.pluginsToPick) return rules

	return Object.fromEntries(
		Object.entries(rules as never).filter(([name, _value]) => {
			if (!name.includes('/')) return true // core eslint rule?

			const ruleNamePrefix = /^([^/]*)\//u.exec(name)?.[1]

			if (!ruleNamePrefix) return true // never happens?

			return options.pluginsToPick?.includes(ruleNamePrefix)
		}),
	) as never
}

export function reducePlugins<
	Plugins extends Exclude<EslintConfig['plugins'], undefined>,
>(plugins: Plugins, options: ReduceEslintConfig.Options): Plugins {
	if (!options.pluginsToPick) return plugins

	return plugins.filter(name => options.pluginsToPick?.includes(name)) as never
}

export function reduceExtends<
	Extends extends Exclude<EslintConfig['extends'] & string[], undefined>,
>(extendsList: Extends, options: ReduceEslintConfig.Options): Partial<Extends> {
	if (!options.pluginsToPick) return extendsList

	return extendsList.filter(extendsEntry => {
		if (extendsEntry.startsWith('eslint:')) return true

		const pluginName = /^(plugin:)?([^/]*)\/?/u.exec(extendsEntry)?.[2]

		// console.log('reduceExtends pluginName', pluginName)
		if (!pluginName) return true // never happens?

		return options.pluginsToPick?.includes(pluginName)
	}) as never
}

export function isEslintConfigOverrideEmpty(config: EslintConfigOverride) {
	if (config.plugins && config.plugins.length > 0) return false

	if (config.extends && config.extends.length > 0) return false

	if (config.rules && Object.keys(config.rules).length > 0) return false

	return true
}

export function reduceEslintConfigOverride<
	Override extends EslintConfigOverride,
>(
	configOverride: Override,
	options: ReduceEslintConfig.Options,
): Partial<Override> | null {
	const result = { ...configOverride }

	if (result.plugins) result.plugins = reducePlugins(result.plugins, options)

	if (result.extends) {
		result.extends = reduceExtends(result.extends as never, options)
	}

	if (result.rules) {
		result.rules = reduceRules(result.rules, options)
	}

	if (isEslintConfigOverrideEmpty(result)) return null

	return result
}

export function reduceEslintConfig<Cfg extends EslintConfig>(
	config: Cfg,
	options: ReduceEslintConfig.Options,
): Partial<Cfg> {
	const result = { ...config }

	if (result.overrides && options.pluginsToPick) {
		result.overrides = result.overrides
			.map(override =>
				reduceEslintConfigOverride(override as EslintConfigOverride, options),
			)
			.filter(Boolean) as EslintConfigOverride[]
	}

	if (result.plugins) result.plugins = reducePlugins(result.plugins, options)

	if (result.extends) {
		result.extends = reduceExtends(result.extends as never, options)
	}

	if (result.rules) {
		result.rules = reduceRules(result.rules, options)
	}

	return result
}
