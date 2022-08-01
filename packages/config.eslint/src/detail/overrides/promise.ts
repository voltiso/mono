// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const promise = defineEslintConfigOverride({
	extends: ['plugin:promise/recommended'],

	files: ['*'],

	plugins: ['promise'],

	rules: {
		'promise/always-return': 'error',
		'promise/avoid-new': 'warn',
		'promise/catch-or-return': 'error',
		'promise/no-callback-in-promise': 'warn',
		'promise/no-native': 'off',
		'promise/no-nesting': 'warn',
		'promise/no-new-statics': 'error',
		'promise/no-promise-in-callback': 'warn',
		'promise/no-return-in-finally': 'warn',
		'promise/no-return-wrap': 'error',
		'promise/param-names': 'error',
		'promise/prefer-await-to-callbacks': 2,
		'promise/prefer-await-to-then': 2,
		'promise/valid-params': 'warn',
	},
} as const)
