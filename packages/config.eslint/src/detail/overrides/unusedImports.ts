// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import unusedImportsPlugin from 'eslint-plugin-unused-imports'

export const unusedImports = defineEslintFlatConfig({
	// files: ['*'],

	// plugins: ['unused-imports'],
	plugins: {
		'unused-imports': unusedImportsPlugin as never,
	},

	rules: {
		...getAllRules(unusedImportsPlugin as never, 'unused-imports', 'warn'),

		'unused-imports/no-unused-vars-ts': 0,
		'unused-imports/no-unused-imports': 1,
		'unused-imports/no-unused-vars': 1,
	},
})
