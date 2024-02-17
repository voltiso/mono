// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import noSecretsPlugin from 'eslint-plugin-no-secrets'

export const noSecrets = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['no-secrets'],
	plugins: {
		'no-secrets': noSecretsPlugin,
	},

	rules: {
		'no-secrets/no-secrets': 'error',
	},
} as const)
