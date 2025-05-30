// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
import formatJsPlugin from 'eslint-plugin-formatjs'

export const formatJs = defineEslintFlatConfig({
	// files: '*',

	// plugins: ['formatjs'],
	plugins: {
		formatjs: formatJsPlugin as never,
	},

	rules: {
		'formatjs/blocklist-elements': 2,
		'formatjs/enforce-description': 2,
		'formatjs/enforce-default-message': 2,
		'formatjs/enforce-placeholders': 2,
		'formatjs/enforce-plural-rules': 2,
		'formatjs/no-camel-case': 2,
		'formatjs/no-emoji': 2,
		'formatjs/no-literal-string-in-jsx': 2,
		'formatjs/no-multiple-whitespaces': 2,
		'formatjs/no-multiple-plurals': 2,
		'formatjs/no-offset': 2,
		'formatjs/enforce-id': 2,
		'formatjs/no-id': 2,
		'formatjs/no-complex-selectors': 2,
	},
})
