// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const simpleImportSort = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['simple-import-sort'],

	rules: {
		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
	},
} as const)
