// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
// eslint-disable-next-line import/no-deprecated, import/default, import/no-named-as-default, import/no-named-as-default-member
import typescriptSortKeysPlugin from 'eslint-plugin-typescript-sort-keys'

import { codeFiles } from '../files'

export const typescriptSortKeys = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(
	// 	typescriptSortKeysPlugin.configs.recommended as never,
	// 	{ 'typescript-sort-keys': typescriptSortKeysPlugin },
	// ),
	{
		files: codeFiles,

		// plugins: ['typescript-sort-keys'],
		plugins: {
			'typescript-sort-keys': typescriptSortKeysPlugin as never,
		},

		// extends: ['plugin:typescript-sort-keys/recommended'],

		rules: {
			...getAllRules(
				typescriptSortKeysPlugin as never,
				'typescript-sort-keys',
				'warn',
			),

			'typescript-sort-keys/interface': 0, // no!
			'typescript-sort-keys/string-enum': 1,
		},
	} as const,
)
