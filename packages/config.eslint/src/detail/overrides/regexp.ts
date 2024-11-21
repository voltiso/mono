// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import regexpPlugin from 'eslint-plugin-regexp'

export const regexpConfig = defineEslintFlatConfig(
	//  ...eslintFlatConfigFromConfig(regexpPlugin.configs.all, {regexp: regexpPlugin}),
	{
		// files: '*',

		// plugins: ['regexp'],

		// extends: ['plugin:regexp/all'],

		plugins: { regexp: regexpPlugin as never },

		rules: {
			...getAllRules(regexpPlugin as never, 'regexp', 'warn'),

			'regexp/no-unused-capturing-group': 0, // false-positives in `str.replace(/.../gu, match => ...)`

			'require-unicode-regexp': 0,
			'regexp/require-unicode-regexp': 1,
			'regexp/require-unicode-sets-regexp': 0, // not yet, node@18.18.0 does not support `v` flag
			'regexp/prefer-named-capture-group': 0, // hmmm, not sure, might be useful
		},
	},
)
