// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import anyParser from 'any-eslint-parser'

export const anyOverride = defineConfig({
	// files: ['*'],

	// parser: 'any-eslint-parser',

	languageOptions: {
		parser: anyParser as never,
	},

	// rules: {
	// 	'multiline-comment-style': 0,
	// 	'no-warning-comments': 0,
	// 	'no-inline-comments': 0, // we like to comment inline
	// 	'line-comment-position': 0,
	// 	'no-secrets/no-secrets': ['error', { tolerance: 4.5 }],
	// },
})

// const a = defineConfig({

// })
