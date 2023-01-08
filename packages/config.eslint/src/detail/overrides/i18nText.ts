// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const i18nText = defineEslintConfigOverride({
	files: '*',

	plugins: ['i18n-text'],

	rules: {
		'i18n-text/no-en': 0, //! this is good! override-enable in projects using i18n
	},
} as const)
