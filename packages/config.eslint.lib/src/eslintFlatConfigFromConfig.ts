// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { fastAssert, omitIfPresent } from '@voltiso/util'

import type { EslintConfig } from './EslintConfig'
import type { EslintFlatConfig } from './EslintFlatConfig'

// eslint-disable-next-line @typescript-eslint/max-params
export function eslintFlatConfigFromConfig(
	config: EslintConfig,
	pluginsMap?: Record<string, unknown>,
	parsersMap?: Record<string, unknown>,
	configsMap?: Record<string, unknown>,
): EslintFlatConfig[] {
	const flatConfig: EslintConfig & EslintFlatConfig = { ...config } as never

	if (Array.isArray(flatConfig.plugins)) {
		// eslint-disable-next-line unicorn/no-array-reduce
		flatConfig.plugins = flatConfig.plugins.reduce(
			(flatConfig, plugin) => {
				fastAssert(pluginsMap?.[plugin], `required plugin ${plugin}`)
				flatConfig[plugin] = pluginsMap[plugin]
				return flatConfig
			},
			{} as Record<string, unknown>,
		) as never
	}

	if (flatConfig.parser) {
		flatConfig.languageOptions ??= {}
		if (typeof flatConfig.parser === 'string') {
			// flatConfig.languageOptions.parser = require(flatConfig.parser)
			// console.log('!!!!!!!! find', flatConfig.parser, 'in', parsersMap)
			// eslint-disable-next-line es-x/no-array-prototype-find
			const key = Object.keys(parsersMap ?? {}).find(key =>
				flatConfig.parser?.includes(key),
			)
			if (!key)
				throw new Error(
					`eslintFlatConfigFromConfig: no parser for ${flatConfig.parser}`,
				)
			flatConfig.languageOptions.parser = parsersMap?.[key] as never
		} else {
			flatConfig.languageOptions.parser = flatConfig.parser
		}
		delete flatConfig.parser
	}

	if (flatConfig.parserOptions) {
		flatConfig.languageOptions ??= {}
		flatConfig.languageOptions.parserOptions = flatConfig.parserOptions
		delete flatConfig.parserOptions
	}

	if (flatConfig.env) {
		if (flatConfig.env.node) delete flatConfig.env.node
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		if (flatConfig.env['es2024']) delete flatConfig.env['es2024']

		if (Object.keys(flatConfig.env).length === 0) delete flatConfig.env
		else {
			throw new Error(
				`eslintFlatConfigFromConfig: unsupported env keys ${Object.keys(flatConfig.env).join(', ')}`,
			)
		}
	}

	if (flatConfig.globals) {
		flatConfig.languageOptions ??= {}
		flatConfig.languageOptions.globals = {
			...flatConfig.languageOptions.globals,
			...flatConfig.globals,
		} as never
		delete flatConfig.globals
	}

	let result: EslintFlatConfig[] = [
		omitIfPresent(flatConfig, 'overrides', 'extends'),
	]

	if (flatConfig.extends) {
		const prepend = []

		for (const extend of flatConfig.extends) {
			// eslint-disable-next-line es-x/no-array-prototype-find
			const key = Object.keys(configsMap ?? {}).find(key =>
				extend.includes(key),
			)
			if (!key)
				throw new Error(`eslintFlatConfigFromConfig: no config for ${extend}`)

			prepend.push(
				...eslintFlatConfigFromConfig(
					configsMap?.[key] as never,
					pluginsMap,
					parsersMap,
					configsMap,
				),
			)
		}

		result = [...prepend, ...result] as never
	}

	if (flatConfig.overrides) {
		for (const override of flatConfig.overrides) {
			result.push(
				...eslintFlatConfigFromConfig(
					override as never,
					pluginsMap,
					parsersMap,
					configsMap,
				),
			)
		}
	}

	return result
}
