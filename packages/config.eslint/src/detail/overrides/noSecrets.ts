// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
import noSecretsPlugin from 'eslint-plugin-no-secrets'

export const noSecrets = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['no-secrets'],
	plugins: {
		'no-secrets': noSecretsPlugin as never,
	},

	rules: {
		'no-secrets/no-secrets': ['warn', { tolerance: 4.5 }],
	},
})
