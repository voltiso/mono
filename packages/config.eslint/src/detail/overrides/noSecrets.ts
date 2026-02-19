// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
import noSecretsPlugin from 'eslint-plugin-no-secrets'

export const noSecrets = defineConfig({
	// files: ['*'],

	// plugins: ['no-secrets'],
	plugins: {
		'no-secrets': noSecretsPlugin as never,
	},

	rules: {
		'no-secrets/no-secrets': ['warn', { tolerance: 4.5 }],
	},
})
