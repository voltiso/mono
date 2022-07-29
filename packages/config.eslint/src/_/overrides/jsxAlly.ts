// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const jsxAlly = defineEslintConfigOverride({
	files: ['*'],

	extends: ['plugin:jsx-a11y/recommended'],
	plugins: ['jsx-a11y'],
} as const)
