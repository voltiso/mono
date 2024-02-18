// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
import tsdocPlugin from 'eslint-plugin-tsdoc'

import { tsFiles } from '~/detail/files'

export const tsdoc = defineEslintFlatConfig({
	files: tsFiles,

	// plugins: ['tsdoc'],
	plugins: {
		tsdoc: tsdocPlugin as never,
	},

	rules: {
		'tsdoc/syntax': 1,
	},
})
