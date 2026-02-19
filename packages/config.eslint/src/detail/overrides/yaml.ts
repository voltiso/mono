// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
import ymlPlugin from 'eslint-plugin-yml'
import * as yamlEslintParser from 'yaml-eslint-parser'

const allRules = getAllRules(ymlPlugin as never, 'yml', 'warn')

// console.log({ allRules })

export const yamlConfig = defineConfig(
	//  ...eslintFlatConfigFromConfig(	ymlPlugin.configs.standard as never, {yml: ymlPlugin}, {'yaml-eslint-parser': yamlEslintParser}, ymlPlugin.configs),
	{
		files: ['*.yaml', '*.yml'],

		languageOptions: {
			parser: yamlEslintParser,
		},

		plugins: {
			yml: ymlPlugin as never,
		},

		// extends: ['plugin:yml/standard'],

		rules: {
			...allRules,

			'yml/sort-keys': 0, // sort logically instead

			'yml/sort-sequence-values': 0,

			'yml/file-extension': 0,

			'yml/quotes': 0, // conflicts with prettier
			'yml/plain-scalar': 1,
		},
	},
)
