// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const regexpOverride = defineEslintConfigOverride({
	files: '*',

	plugins: ['regexp'],

	extends: ['plugin:regexp/all'],

	rules: {
		'regexp/no-unused-capturing-group': 0, // false-positives in `str.replace(/.../gu, match => ...)`
	},
} as const)
