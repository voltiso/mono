// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import formatMessagePlugin from 'eslint-plugin-format-message'

export const formatMessage = defineEslintFlatConfig(
	formatMessagePlugin.configs.recommended,
	{
		// files: ['*'],

		// plugins: ['format-message'],
		plugins: {
			'format-message': formatMessagePlugin as never,
		},

		rules: {
			'format-message/literal-pattern': 1,
			'format-message/literal-locale': 1,
			'format-message/no-identical-translation': 1,
			'format-message/no-invalid-pattern': 2,
			'format-message/no-invalid-translation': 2,
			'format-message/no-missing-params': ['error', { allowNonLiteral: true }],
			'format-message/no-missing-translation': 1,
			'format-message/translation-match-params': 2,
		},

		settings: {
			'format-message': {
				// generateId: 'normalized',
				// sourceLocale: 'en-GB',
				// translations: './locales',
			},
		},
	} as const,
)
