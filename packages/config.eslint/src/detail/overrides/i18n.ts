// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Linter } from 'eslint'
// @ts-expect-error no typings
import i18nPlugin from 'eslint-plugin-i18n'

export const i18nConfig: Linter.FlatConfig[] = [
	// ...eslintFlatConfigFromConfig(i18nPlugin.configs.recommended, {
	// 	i18n: i18nPlugin,
	// }),
	{
		// files: '*',

		plugins: {
			i18n: i18nPlugin as never,
		},

		rules: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...i18nPlugin.configs.recommended.rules as {},

			'i18n/no-chinese-character': 1,
			'i18n/no-greek-character': 1,
			'i18n/no-japanese-character': 1,
			'i18n/no-korean-character': 1,
			'i18n/no-russian-character': 1,
			'i18n/no-thai-character': 1,
		},
	},
]
