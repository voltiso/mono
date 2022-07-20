// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const sortKeysFix = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['sort-keys-fix'],

	rules: {
		'sort-keys-fix/sort-keys-fix': 0, // well - whole plugin currently unused
	},
})
