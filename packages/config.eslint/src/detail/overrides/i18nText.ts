// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import i18nTextPlugin from 'eslint-plugin-i18n-text'

export const i18nText = defineEslintFlatConfig({
	// files: '*',

	plugins: {
		'i18n-text': i18nTextPlugin as never,
	},

	rules: {
		'i18n-text/no-en': 0, // ! this is good! override-enable in projects using i18n
	},
})
