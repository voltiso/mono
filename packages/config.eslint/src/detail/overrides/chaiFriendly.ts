// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import chaiFriendlyPlugin from 'eslint-plugin-chai-friendly'

export const chaiFriendly = defineEslintFlatConfig(
 ...eslintFlatConfigFromConfig(chaiFriendlyPlugin.configs.recommended, {'chai-friendly': chaiFriendlyPlugin}),
	{
		// files: ['*'],

		// plugins: ['chai-friendly'],

		// extends: ['plugin:chai-friendly/recommended'],

		rules: {
			'no-unused-expressions': 0, // disable original no-unused-expressions
			'chai-friendly/no-unused-expressions': 2, // enable chai-friendly one
		},
	} as const,
)
