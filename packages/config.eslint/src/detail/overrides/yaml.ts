// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import ymlPlugin from 'eslint-plugin-yml'
import yamlEslintParser from 'yaml-eslint-parser'

export const yamlConfig = [
	//  ...eslintFlatConfigFromConfig(	ymlPlugin.configs.standard as never, {yml: ymlPlugin}, {'yaml-eslint-parser': yamlEslintParser}, ymlPlugin.configs),
	{
		files: ['*.yaml', '*.yml'],

		// parser: 'yaml-eslint-parser',

		languageOptions: {
			parser: yamlEslintParser,
		},

		// plugins: ['yml'],
		plugins: {
			yml: ymlPlugin as never,
		},

		// extends: ['plugin:yml/standard'],

		rules: {
			...ymlPlugin.configs.standard.rules,

			'yml/quotes': 0, // conflicts with prettier
			'yml/plain-scalar': 1,
		},
	},
]
