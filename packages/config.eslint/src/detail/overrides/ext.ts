// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import ext from 'eslint-plugin-ext'

export const extOverride = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['ext'],
	plugins: {
		ext,
	},

	rules: {
		'ext/lines-between-object-properties': [
			'warn',
			'always',
			{ exceptBetweenSingleLines: true },
		],
	},
} as const)
