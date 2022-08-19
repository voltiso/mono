// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const toml = defineEslintConfigOverride({
	files: ['*.toml'],

	parser: 'toml-eslint-parser',

	plugins: ['toml'],

	extends: ['plugin:toml/standard'],
} as const)
