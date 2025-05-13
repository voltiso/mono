// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintFlatConfig,
	eslintFlatConfigFromConfig,
} from '@voltiso/config.eslint.lib'
// import tomlParser from 'toml-eslint-parser'
import tomlPlugin from 'eslint-plugin-toml'
import tomlEslintParser from 'toml-eslint-parser'

export const toml = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(
		tomlPlugin.configs.standard as never,
		{ toml: tomlPlugin },
		{ 'toml-eslint-parser': tomlEslintParser },
		tomlPlugin.configs,
	),
	// 	{
	// 	files: ['*.toml'],

	// 	// parser: 'toml-eslint-parser',

	// 	// plugins: ['toml'],

	// 	// extends: ['plugin:toml/standard'],
	// } as const
)
