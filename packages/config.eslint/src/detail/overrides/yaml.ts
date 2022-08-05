// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const yaml = defineEslintConfigOverride({
	files: ['*.yaml', '*.yml'],

	parser: 'yaml-eslint-parser',

	plugins: ['yml'],

	extends: ['plugin:yml/standard'],

	rules: {
		'yml/quotes': 0, // conflicts with prettier
		'yml/plain-scalar': 1,
	},
} as const)
