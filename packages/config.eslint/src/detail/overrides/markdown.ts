// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

const basicMarkdownOverride = defineEslintConfigOverride({
	files: ['*.md'],

	plugins: ['markdown'],
	extends: ['plugin:markdown/recommended'],

	// processor: 'markdown/markdown',

	// rules: {
	// 	'notice/notice': 0,
	// },
} as const)

export const markdownOverrides = [
	basicMarkdownOverride,
	// {
	// 	//
	// },
] as const
