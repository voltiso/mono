// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const typescriptSortKeys = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['typescript-sort-keys'],

	extends: ['plugin:typescript-sort-keys/recommended'],

	rules: {
		'typescript-sort-keys/interface': 0, // no!
		'typescript-sort-keys/string-enum': 'error',
	},
} as const)
