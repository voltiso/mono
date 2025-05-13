// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import htmlPlugin from 'eslint-plugin-html'

export const html = defineEslintFlatConfig({
	// files: ['*.html', '*.htm'],

	// plugins: ['html'],

	// languageOptions: {
	// 	parser: anyParser
	// },

	plugins: {
		html: htmlPlugin as never,
	},

	settings: {
		'html/indent': 'tab', // indentation is one tab at the beginning of the line.
	},
} as const)
