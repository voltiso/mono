// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const noUnsanitized = defineEslintConfigOverride({
	extends: ['plugin:no-unsanitized/DOM'],

	files: ['*'],

	plugins: ['no-unsanitized'],

	rules: {
		'no-unsanitized/method': 'error',
		'no-unsanitized/property': 'error',
	},
} as const)
