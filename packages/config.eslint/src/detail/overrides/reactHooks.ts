// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

// @ts-expect-error no typings
import reactHooksPlugin from 'eslint-plugin-react-hooks'

const additional2ArgumentHooksWithDeps = [
	'useReactiveEffect',
	'useReactiveMemo',
	'useReactiveMemo$',
] as const

const baseConfig = reactHooksPlugin.configs.recommended

// fix plugins array -> object (convert to eslint flat config)
const baseFlatConfig = {
	...baseConfig,
	plugins: {
		'react-hooks': reactHooksPlugin,
	},
}

export const reactHooks = defineEslintFlatConfig(baseFlatConfig, {
	files: codeFiles,

	// plugins: ['react-hooks'],
	// plugins: {
	// 	'react-hooks': reactHooksPlugin,
	// },

	// extends: ['plugin:react-hooks/recommended'],

	rules: {
		'react-hooks/rules-of-hooks': 1,

		'react-hooks/exhaustive-deps': [
			'warn',
			{
				/** Regex */
				additionalHooks: `(${additional2ArgumentHooksWithDeps.join('|')})`,
			},
		],
	},
} as const)
