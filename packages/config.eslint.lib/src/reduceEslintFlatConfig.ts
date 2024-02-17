// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EslintFlatConfig } from './EslintFlatConfig.js'
import type { ReduceEslintConfig } from './reduceEslintConfig.js'
import { reduceRules } from './reduceEslintConfig.js'

export function reduceFlatPlugins<
	Plugins extends Exclude<EslintFlatConfig['plugins'], undefined>,
>(plugins: Plugins, options: ReduceEslintConfig.Options): Plugins {
	if (!options.pluginsToPick) return plugins

	return Object.fromEntries(
		Object.entries(plugins).filter(([name, _]) => {
			const shouldPick =
				!options.pluginsToPick || options.pluginsToPick.includes(name)

			return shouldPick && !(options.pluginsToOmit ?? []).includes(name)
		}),
	) as never
}

export function isEslintFlatConfigEmpty(config: EslintFlatConfig): boolean {
	if (config.plugins && Object.keys(config.plugins).length > 0) return false
	if (config.rules && Object.keys(config.rules).length > 0) return false
	return true
}

export function reduceEslintFlatConfigEntry<Config extends EslintFlatConfig>(
	configOverride: Config,
	options: ReduceEslintConfig.Options,
): Partial<Config> | null {
	const result = { ...configOverride }

	if (result.plugins)
		result.plugins = reduceFlatPlugins(result.plugins, options)

	if (result.rules) {
		result.rules = reduceRules(result.rules, options)
	}

	if (isEslintFlatConfigEmpty(result)) return null

	return result
}

export function reduceEslintFlatConfig<
	Configs extends readonly EslintFlatConfig[],
>(configs: Configs, options: ReduceEslintConfig.Options): Partial<Configs> {
	return configs
		.map(config => reduceEslintFlatConfigEntry(config, options))
		.filter(Boolean) as never
}
