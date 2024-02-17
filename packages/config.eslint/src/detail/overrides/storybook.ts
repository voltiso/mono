// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import storybookPlugin from 'eslint-plugin-storybook'

export const storybook = defineEslintFlatConfig(
 ...eslintFlatConfigFromConfig(	storybookPlugin.configs.recommended, {'storybook': storybookPlugin}),
	{
		// files: ['*'],
		// files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],
		// extends: ['plugin:storybook/recommended'],
	} as const,
)
