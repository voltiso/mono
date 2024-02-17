// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import htmlPlugin from 'eslint-plugin-html'

export const html = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['html'],

	plugins: {
		html: htmlPlugin as never,
	},

	settings: {
		'html/indent': 'tab', // indentation is one tab at the beginning of the line.
	},
} as const)
