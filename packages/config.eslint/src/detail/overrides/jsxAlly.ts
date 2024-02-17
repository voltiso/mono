// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import jsxAllyPlugin from 'eslint-plugin-jsx-a11y'

export const jsxAlly = defineEslintFlatConfig(
 ...eslintFlatConfigFromConfig(jsxAllyPlugin.configs.recommended, {'jsx-a11y': jsxAllyPlugin}),
	{
		// files: ['*'],

		// extends: ['plugin:jsx-a11y/recommended'],
		// plugins: ['jsx-a11y'],

		rules: {
			'jsx-a11y/no-autofocus': 0, // hmm
		},
	} as const,
)
