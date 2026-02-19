// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
import reactHooksPlugin from 'eslint-plugin-react-hooks'

import { codeFiles } from '~/detail/files'

const additional2ArgumentHooksWithDeps = [
	'useReactiveEffect',
	'useReactiveMemo',
	'useReactiveMemo$',
] as const

// const baseConfig = reactHooksPlugin.configs.recommended

// fix plugins array -> object (convert to eslint flat config)
// const baseFlatConfig = {
// 	...baseConfig,

// 	plugins: {
// 		'react-hooks': reactHooksPlugin,
// 	},
// }

export const reactHooksConfig = defineConfig({
	files: codeFiles,

	plugins: {
		'react-hooks': reactHooksPlugin as never,
	},

	// extends: ['plugin:react-hooks/recommended'],

	rules: {
		...getAllRules(reactHooksPlugin as never, 'react-hooks', 'warn'),

		'react-hooks/rules-of-hooks': 1,

		'react-hooks/exhaustive-deps': [
			'warn',
			{
				/** Regex */
				additionalHooks: `(${additional2ArgumentHooksWithDeps.join('|')})`,
			},
		],
	},
})
