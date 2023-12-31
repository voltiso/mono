// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

const additional2ArgumentHooksWithDeps = [
	'useReactiveEffect',
	'useReactiveMemo',
	'useReactiveMemo$',
] as const

export const reactHooks = defineEslintConfigOverride({
	files: codeFiles,

	plugins: ['react-hooks'],

	extends: ['plugin:react-hooks/recommended'],

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
