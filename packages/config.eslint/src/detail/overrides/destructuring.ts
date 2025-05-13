// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import destructuringPlugin from 'eslint-plugin-destructuring'

import { codeFiles } from '../files'

export const destructuringConfig = defineEslintFlatConfig({
	files: codeFiles,

	// plugins: ['destructuring'],
	plugins: { destructuring: destructuringPlugin as never },

	rules: {
		'destructuring/no-rename': 1,
		'destructuring/in-params': ['warn', { 'max-params': 1 }],
		'destructuring/in-methods-params': 1,
	},
})
