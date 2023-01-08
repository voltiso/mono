// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const extOverride = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['ext'],

	rules: {
		'ext/lines-between-object-properties': [
			'warn',
			'always',
			{ exceptBetweenSingleLines: true },
		],
	},
} as const)
