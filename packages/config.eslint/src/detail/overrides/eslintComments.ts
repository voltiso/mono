// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import eslintCommentsPlugin from 'eslint-plugin-eslint-comments'

export const eslintComments = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(
	// 	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	// 	eslintCommentsPlugin.configs.recommended as never,
	// 	{ 'eslint-comments': eslintCommentsPlugin },
	// ),
	{
		// files: ['*'],

		// extends: ['plugin:eslint-comments/recommended'],

		// plugins: ['eslint-comments'],

		plugins: {
			'eslint-comments': eslintCommentsPlugin as never,
		},

		rules: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...(eslintCommentsPlugin.configs.recommended.rules as {}),

			'eslint-comments/disable-enable-pair': 0,
			'eslint-comments/no-unused-disable': 1,
			'eslint-comments/no-use': 0,
			'eslint-comments/no-unlimited-disable': 0, // handled by unicorn
		},
	} as const,
)
