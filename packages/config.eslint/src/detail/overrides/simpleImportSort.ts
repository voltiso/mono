// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

export const simpleImportSort = defineConfig({
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
