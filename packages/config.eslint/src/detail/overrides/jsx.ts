// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

export const jsx = defineEslintConfigOverride({
	files: ['*'],

	plugins: ['jsx'],

	extends: ['plugin:react/jsx-runtime'],

	rules: {
		// 'jsx/uses-factory': [1, { pragma: 'JSX' }],
		// 'jsx/factory-in-scope': [1, { pragma: 'JSX' }],
		'jsx/mark-used-vars': 1,
		'jsx/no-undef': 0, // does not work with boolean props
	},
} as const)
