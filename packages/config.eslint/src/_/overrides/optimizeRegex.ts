// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const optimizeRegex = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['optimize-regex'],

	// extends: ['optimize-regex/recommended'],
	// extends: ['optimize-regex/all'],
	rules: {
		'optimize-regex/optimize-regex': 0, // ! bugged !
	},
} as const)
