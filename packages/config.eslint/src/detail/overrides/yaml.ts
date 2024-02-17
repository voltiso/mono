import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import ymlPlugin from 'eslint-plugin-yml'
import yamlEslintParser from 'yaml-eslint-parser'

export const yaml = defineEslintFlatConfig(
	
 ...eslintFlatConfigFromConfig(	ymlPlugin.configs.standard as never, {yml: ymlPlugin}, {'yaml-eslint-parser': yamlEslintParser}, ymlPlugin.configs), {
	files: ['*.yaml', '*.yml'],

	// parser: 'yaml-eslint-parser',

	languageOptions: {
		parser: yamlEslintParser
	},

	// plugins: ['yml'],

	// extends: ['plugin:yml/standard'],

	rules: {
		'yml/quotes': 0, // conflicts with prettier
		'yml/plain-scalar': 1,
	},
} as const)
