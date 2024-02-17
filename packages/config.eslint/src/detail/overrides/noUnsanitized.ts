// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import noUnsanitizedPlugin from 'eslint-plugin-no-unsanitized'

export const noUnsanitized = defineEslintFlatConfig(
  ...eslintFlatConfigFromConfig(noUnsanitizedPlugin.configs.DOM, {'no-unsanitized': noUnsanitizedPlugin}),
	{
		// extends: ['plugin:no-unsanitized/DOM'],

		// files: ['*'],

		// plugins: ['no-unsanitized'],

		rules: {
			'no-unsanitized/method': 'error',
			'no-unsanitized/property': 'error',
		},
	} as const,
)
