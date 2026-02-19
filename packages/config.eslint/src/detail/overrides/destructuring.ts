// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import destructuringPlugin from 'eslint-plugin-destructuring'

import { codeFiles } from '../files'

export const destructuringConfig = defineConfig({
	files: codeFiles,

	// plugins: ['destructuring'],
	plugins: { destructuring: destructuringPlugin as never },

	rules: {
		'destructuring/no-rename': 1,
		'destructuring/in-params': ['warn', { 'max-params': 1 }],
		'destructuring/in-methods-params': 1,
	},
})
