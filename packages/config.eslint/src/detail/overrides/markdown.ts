// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
import { getAllRules } from '@voltiso/config.eslint.lib'
import markdownPlugin from '@eslint/markdown'

import { filesInsideMd } from '../files'

export const markdownConfig = defineConfig(
	//  ...eslintFlatConfigFromConfig(markdownPlugin.configs.recommended, {'markdown': markdownPlugin}),
	{
		// files: ['LICENSE.md'],

		files: ['**/*.md'],

		plugins: {
			markdown: markdownPlugin as never,
		},

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		processor: markdownPlugin.processors.markdown as never,

		rules: {
			...getAllRules(markdownPlugin, 'markdown', 'warn'),
			// 'notice/notice': 0,
		},
	},
)

export const additionalMarkdownOverrides = defineConfig({
	files: filesInsideMd,

	rules: {
		'import/unambiguous': 0,
	},
})
