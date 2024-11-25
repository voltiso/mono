// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import storybookPlugin from 'eslint-plugin-storybook'

export const storybook = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(storybookPlugin.configs.recommended, {
	// 	storybook: storybookPlugin,
	// }),
	{
		// files: ['*'],
		// files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
		// extends: ['plugin:storybook/recommended'],

		plugins: { storybook: storybookPlugin as never },

		rules: {
			...getAllRules(storybookPlugin as never, 'storybook', 'warn'),

			//
		},
	} as const,
)
