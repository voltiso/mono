// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const noSecrets = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['no-secrets'],

	rules: {
		'no-secrets/no-secrets': 'error',
	},
} as const)
