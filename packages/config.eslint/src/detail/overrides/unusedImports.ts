// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import unusedImportsPlugin from 'eslint-plugin-unused-imports'

export const unusedImports = defineEslintConfigOverride({
	// files: ['*'],

	// plugins: ['unused-imports'],
	plugins: {
		'unused-imports': unusedImportsPlugin,
	},

	rules: {
		'unused-imports/no-unused-imports': 1,
		'unused-imports/no-unused-vars': 1,
	},
} as const)
