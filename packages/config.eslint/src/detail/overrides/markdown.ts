// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { filesInsideMd } from '../files'

// @ts-expect-error no typings
import markdownPlugin from 'eslint-plugin-markdown'
import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'

export const markdownOverride = defineEslintFlatConfig(
 ...eslintFlatConfigFromConfig(markdownPlugin.configs.recommended, {'markdown': markdownPlugin}),
	{
		files: ['*.md'],

		// plugins: ['markdown'],
		// extends: ['plugin:markdown/recommended'],

		// processor: 'markdown/markdown',

		// rules: {
		// 	'notice/notice': 0,
		// },
	} as const,
)

export const additionalMarkdownOverrides = [
	{
		files: filesInsideMd,

		rules: {
			'import/unambiguous': 0,
		},
	},
] as const
