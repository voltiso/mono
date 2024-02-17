// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import i18nPlugin from 'eslint-plugin-i18n'

export const i18n = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(i18nPlugin.configs.recommended, {'i18n': i18nPlugin}), {
	// files: '*',

	// plugins: ['i18n'],
	// plugins: {
	// 	i18n: i18nPlugin,
	// },

	rules: {
		'i18n/no-chinese-character': 1,
		'i18n/no-greek-character': 1,
		'i18n/no-japanese-character': 1,
		'i18n/no-korean-character': 1,
		'i18n/no-russian-character': 1,
		'i18n/no-thai-character': 1,
	},
} as const)
