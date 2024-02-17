// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort'

export const simpleImportSort = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['simple-import-sort'],
	plugins: {
		'simple-import-sort': simpleImportSortPlugin as never,
	},

	rules: {
		'simple-import-sort/imports': 'warn',
		'simple-import-sort/exports': 'warn',
	},
} as const)
