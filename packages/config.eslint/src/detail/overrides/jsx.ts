// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import jsxPlugin from 'eslint-plugin-jsx'

// @ts-expect-error no typings
import reactPlugin from 'eslint-plugin-react'

export const jsx = defineEslintFlatConfig(
 ...eslintFlatConfigFromConfig(reactPlugin.configs['jsx-runtime'], {react: reactPlugin}),
	 {
	// files: ['*'],

	// plugins: ['jsx'],
	plugins: {
		jsx: jsxPlugin,
	},

	// extends: ['plugin:react/jsx-runtime'],

	rules: {
		// 'jsx/uses-factory': [1, { pragma: 'JSX' }],
		// 'jsx/factory-in-scope': [1, { pragma: 'JSX' }],
		'jsx/mark-used-vars': 1,
		'jsx/no-undef': 0, // does not work with boolean props
	},
} as const)
