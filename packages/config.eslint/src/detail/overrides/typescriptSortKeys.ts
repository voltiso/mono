// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { codeFiles } from '../files'

// @ts-expect-error no typings
import typescriptSortKeysPlugin from 'eslint-plugin-typescript-sort-keys'
import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'

export const typescriptSortKeys = defineEslintFlatConfig(
  ...eslintFlatConfigFromConfig(typescriptSortKeysPlugin.configs.recommended as never, {'typescript-sort-keys': typescriptSortKeysPlugin}),
	{
		files: codeFiles,

		// plugins: ['typescript-sort-keys'],

		// extends: ['plugin:typescript-sort-keys/recommended'],

		rules: {
			'typescript-sort-keys/interface': 0, // no!
			'typescript-sort-keys/string-enum': 1,
		},
	} as const,
)
