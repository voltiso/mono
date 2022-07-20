// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const storybook = defineEslintConfigOverride({
	files: ['*'],
	// files: ['*.stories.@(ts|tsx|js|jsx|mjs|cjs)'],

	extends: ['plugin:storybook/recommended'],
})
