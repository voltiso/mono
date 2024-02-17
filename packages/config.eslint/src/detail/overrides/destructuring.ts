// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '../files'

// @ts-expect-error no typings
import destructuringPlugin from 'eslint-plugin-destructuring'

export const destructuring = defineEslintConfigOverride({
	files: codeFiles,

	// plugins: ['destructuring'],
	plugins: { destructuring: destructuringPlugin },

	rules: {
		'destructuring/no-rename': 1,
		'destructuring/in-params': ['warn', { 'max-params': 1 }],
		'destructuring/in-methods-params': 1,
	},
} as const)
