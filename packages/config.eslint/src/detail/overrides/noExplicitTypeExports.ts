// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import noExplicitTypeExportsPlugin from 'eslint-plugin-no-explicit-type-exports'

import { codeFiles } from '../files'

// console.log('!!!!!', noExplicitTypeExportsPlugin.configs.config)

// const config = { ...noExplicitTypeExportsPlugin.configs.config }

// config.plugins = [...config.plugins, 'no-explicit-type-exports']

export const noExplicitTypeExports = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(
	// 	config,
	// 	{
	// 		'@typescript-eslint': typescriptPlugin,
	// 		'no-explicit-type-exports': noExplicitTypeExportsPlugin,
	// 	},
	// 	{ '@typescript-eslint/parser': typescriptParser },
	// ),
	{
		// files: ['*'],

		files: codeFiles,

		plugins: {
			'no-explicit-type-exports': noExplicitTypeExportsPlugin as never,
		},

		rules: {
			...getAllRules(
				noExplicitTypeExportsPlugin as never,
				'no-explicit-type-exports',
				'warn',
			),

			'no-explicit-type-exports/no-explicit-type-exports': 2,
		},
	} as const,
)
