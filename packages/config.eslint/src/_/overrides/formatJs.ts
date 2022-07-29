// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const formatJs = defineEslintConfigOverride({
	files: '*',

	plugins: ['formatjs'],

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
} as const)
