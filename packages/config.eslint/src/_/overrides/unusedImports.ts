// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const unusedImports = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['unused-imports'],

	rules: {
		'unused-imports/no-unused-imports': 2,
		'unused-imports/no-unused-vars': 2,
	},
})
