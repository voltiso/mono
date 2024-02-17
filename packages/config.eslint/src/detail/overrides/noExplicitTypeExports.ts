// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import noExplicitTypeExportsPlugin from 'eslint-plugin-no-explicit-type-exports'

// @ts-expect-error no typings
import typescriptParser from '@typescript-eslint/parser'

import typescriptPlugin from '@typescript-eslint/eslint-plugin'

// console.log('!!!!!', noExplicitTypeExportsPlugin.configs.config)

const config = {...noExplicitTypeExportsPlugin.configs.config}

config.plugins = [...config.plugins, 'no-explicit-type-exports']

export const noExplicitTypeExports = defineEslintFlatConfig(
   ...eslintFlatConfigFromConfig(config, {'@typescript-eslint': typescriptPlugin, 'no-explicit-type-exports': noExplicitTypeExportsPlugin}, {'@typescript-eslint/parser': typescriptParser}),
	{
		// files: ['*'],

		// plugins: ['no-explicit-type-exports'],
		// plugins: {
		// 	'no-explicit-type-exports': noExplicitTypeExportsPlugin,
		// },

		rules: {
			'no-explicit-type-exports/no-explicit-type-exports': 2,
		},
	} as const,
)
