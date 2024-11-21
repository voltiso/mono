// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

export const simpleImportSort = defineEslintFlatConfig({
	// files: ['*'],

	plugins: {
		'simple-import-sort': simpleImportSortPlugin as never,
	},

	rules: {
		...getAllRules(
			simpleImportSortPlugin as never,
			'simple-import-sort',
			'warn',
		),

		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
	},
})
