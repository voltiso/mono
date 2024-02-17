// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
// @ts-expect-error no typings
import markdownPlugin from 'eslint-plugin-markdown'

import { filesInsideMd } from '../files'

export const markdownConfig: Linter.FlatConfig[] = [
	//  ...eslintFlatConfigFromConfig(markdownPlugin.configs.recommended, {'markdown': markdownPlugin}),
	{
		// files: ['LICENSE.md'],

		files: ['**/*.md'],

		// plugins: {
		// 	markdown: markdownPlugin,
		// },

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		processor: markdownPlugin.processors.markdown as never,

		// rules: {
		// 	...getAllRules(markdownPlugin, 'markdown', 'warn'),
		// 	// 'notice/notice': 0,
		// },
	},
]

export const additionalMarkdownOverrides = [
	{
		files: filesInsideMd,

		rules: {
			'import/unambiguous': 0,
		},
	},
] as const
