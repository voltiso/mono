// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import chaiFriendlyPlugin from 'eslint-plugin-chai-friendly'

export const chaiFriendly = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(chaiFriendlyPlugin.configs.recommended, {
	// 	'chai-friendly': chaiFriendlyPlugin,
	// }),
	{
		// files: ['*'],

		plugins: {
			'chai-friendly': chaiFriendlyPlugin as never,
		},

		// extends: ['plugin:chai-friendly/recommended'],

		rules: {
			...getAllRules(chaiFriendlyPlugin as never, 'chai-friendly', 'warn'),

			'no-unused-expressions': 0, // disable original no-unused-expressions
			'chai-friendly/no-unused-expressions': 2, // enable chai-friendly one
		},
	},
)
