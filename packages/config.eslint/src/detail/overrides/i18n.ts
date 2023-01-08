// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const i18n = defineEslintConfigOverride({
	files: '*',

	plugins: ['i18n'],

	rules: {
		'i18n/no-chinese-character': 1,
		'i18n/no-greek-character': 1,
		'i18n/no-japanese-character': 1,
		'i18n/no-korean-character': 1,
		'i18n/no-russian-character': 1,
		'i18n/no-thai-character': 1,
	},
} as const)
