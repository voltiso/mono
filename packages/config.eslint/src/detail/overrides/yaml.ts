// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import ymlPlugin from 'eslint-plugin-yml'
import yamlEslintParser from 'yaml-eslint-parser'

const allRules = getAllRules(ymlPlugin as never, 'yml', 'warn')
delete allRules['yml/sort-sequence-values']

export const yamlConfig = defineEslintFlatConfig(
	//  ...eslintFlatConfigFromConfig(	ymlPlugin.configs.standard as never, {yml: ymlPlugin}, {'yaml-eslint-parser': yamlEslintParser}, ymlPlugin.configs),
	{
		files: ['*.yaml', '*.yml'],

		// parser: 'yaml-eslint-parser',

		languageOptions: {
			parser: yamlEslintParser as never,
		},

		// plugins: ['yml'],
		plugins: {
			yml: ymlPlugin as never,
		},

		// extends: ['plugin:yml/standard'],

		rules: {
			...allRules,

			// 'yml/sort-sequence-values': 0,

			'yml/file-extension': 0,

			'yml/quotes': 0, // conflicts with prettier
			'yml/plain-scalar': 1,
		},
	},
)
