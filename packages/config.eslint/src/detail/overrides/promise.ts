// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const promise = defineEslintConfigOverride({
	extends: ['plugin:promise/recommended'],

	files: ['*'],

	plugins: ['promise'],

	rules: {
		'promise/always-return': 1,
		'promise/avoid-new': 1,
		'promise/catch-or-return': 1,
		'promise/no-callback-in-promise': 1,
		'promise/no-native': 0,
		'promise/no-nesting': 1,
		'promise/no-new-statics': 1,
		'promise/no-promise-in-callback': 1,
		'promise/no-return-in-finally': 1,
		'promise/no-return-wrap': 1,
		'promise/param-names': 1,
		'promise/prefer-await-to-callbacks': 1,
		'promise/prefer-await-to-then': 1,
		'promise/valid-params': 1,
	},
} as const)