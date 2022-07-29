// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const i18next = defineEslintConfigOverride({
	files: '*',

	plugins: ['i18next'],

	extends: ['plugin:i18next/recommended'],

	rules: {
		'i18next/no-literal-string': 2,

		// 'i18next/no-literal-string': [
		// 	'error',
		// 	{
		// 		mode: 'jsx-text-only',
		// 		// mode: 'all',
		// 		'should-validate-template': true,
		// 	},
		// ],
	},
} as const)
