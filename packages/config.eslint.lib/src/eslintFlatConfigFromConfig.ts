import { fastAssert, omitIfPresent } from '@voltiso/util'
import type { EslintConfig } from './EslintConfig'
import type { EslintFlatConfig } from './EslintFlatConfig'

export function eslintFlatConfigFromConfig(
	config: EslintConfig,
	pluginsMap?: Record<string, unknown>,
	parsersMap?: Record<string, unknown>,
	configsMap?: Record<string, unknown>,
): EslintFlatConfig[] {
	const flatConfig: EslintFlatConfig & EslintConfig = { ...config } as never

	if (Array.isArray(flatConfig.plugins)) {
		flatConfig.plugins = flatConfig.plugins.reduce(
			(flatConfig, plugin) => {
				fastAssert(pluginsMap?.[plugin], 'required plugin ' + plugin)
				flatConfig[plugin] = pluginsMap[plugin]
				return flatConfig
			},
			{} as Record<string, unknown>,
		) as never
	}

	if(flatConfig.parser) {
		flatConfig.languageOptions ??= {}
		if(typeof flatConfig.parser === 'string') {
			// flatConfig.languageOptions.parser = require(flatConfig.parser)
			// console.log('!!!!!!!! find', flatConfig.parser, 'in', parsersMap)
			const key = Object.keys(parsersMap || {}).filter((key) => flatConfig.parser?.includes(key))[0]
			if(!key) throw new Error('eslintFlatConfigFromConfig: no parser for ' + flatConfig.parser)
			flatConfig.languageOptions.parser = parsersMap?.[key] as never
		}
		else {
			flatConfig.languageOptions.parser = flatConfig.parser
		}
		delete flatConfig.parser
	}

	if (flatConfig.parserOptions) {
		flatConfig.languageOptions ??= {}
		flatConfig.languageOptions.parserOptions = flatConfig.parserOptions
		delete flatConfig.parserOptions
	}

	if(flatConfig.env) {
		if(flatConfig.env.node) delete flatConfig.env.node
		if(flatConfig.env['es2024']) delete flatConfig.env['es2024']

		if(Object.keys(flatConfig.env).length === 0) delete flatConfig.env
		else {
			throw new Error('eslintFlatConfigFromConfig: unsupported env keys ' + Object.keys(flatConfig.env).join(', '))
		}
	}

	if(flatConfig.globals) {
		flatConfig.languageOptions ??= {}
		flatConfig.languageOptions.globals = {...flatConfig.languageOptions.globals || {}, ...flatConfig.globals} as never
		delete flatConfig.globals
	}

	let result: EslintFlatConfig[] = [omitIfPresent(flatConfig, 'overrides', 'extends')]

	if(flatConfig.extends) {
		const prepend = []

		for(const extend of flatConfig.extends) {
			const key = Object.keys(configsMap || {}).filter((key) => extend.includes(key))[0]
			if(!key) throw new Error('eslintFlatConfigFromConfig: no config for ' + extend)

			prepend.push(...eslintFlatConfigFromConfig(configsMap![key] as never, pluginsMap, parsersMap, configsMap))
		}

		result = [...prepend, ...result] as never
	}

	if(flatConfig.overrides) {
		for(const override of flatConfig.overrides) {
			result.push(...eslintFlatConfigFromConfig(override as never, pluginsMap, parsersMap, configsMap))
		}
	}

	return result
}
