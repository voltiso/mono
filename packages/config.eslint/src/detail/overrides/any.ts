// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const anyOverride = defineEslintConfigOverride({
	files: ['*'],

	parser: 'any-eslint-parser',

	rules: {
		'multiline-comment-style': 0,
		'no-warning-comments': 0,
		'no-inline-comments': 0, // we like to comment inline
		'line-comment-position': 0,
		'no-secrets/no-secrets': ['error', { tolerance: 4.5 }],
	},
})
