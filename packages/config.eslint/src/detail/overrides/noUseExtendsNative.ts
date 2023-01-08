// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const noUseExtendNative = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['no-use-extend-native'],

	extends: ['plugin:no-use-extend-native/recommended'],

	rules: {
		'no-use-extend-native/no-use-extend-native': 1,
	},
} as const)
