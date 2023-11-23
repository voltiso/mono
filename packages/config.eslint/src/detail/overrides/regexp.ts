// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const regexpOverride = defineEslintConfigOverride({
	files: '*',

	plugins: ['regexp'],

	extends: ['plugin:regexp/all'],

	rules: {
		'regexp/no-unused-capturing-group': 0, // false-positives in `str.replace(/.../gu, match => ...)`

		'require-unicode-regexp': 0,
		'regexp/require-unicode-regexp': 1,
		'regexp/require-unicode-sets-regexp': 0, // not yet, node@18.18.0 does not support `v` flag
		'regexp/prefer-named-capture-group': 0, // hmmm, not sure, might be useful
	},
} as const)
