// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
import tsdocPlugin from 'eslint-plugin-tsdoc'

import { tsFiles } from '~/detail/files'

export const tsdoc = defineConfig({
	files: tsFiles,

	// plugins: ['tsdoc'],
	plugins: {
		tsdoc: tsdocPlugin as never,
	},

	rules: {
		'tsdoc/syntax': 1,
	},
})
