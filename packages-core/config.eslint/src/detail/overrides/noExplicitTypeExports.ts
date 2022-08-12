// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const noExplicitTypeExports = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['no-explicit-type-exports'],

	rules: {
		'no-explicit-type-exports/no-explicit-type-exports': 2,
	},
} as const)
