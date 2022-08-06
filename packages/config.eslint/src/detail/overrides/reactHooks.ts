// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

export const reactHooks = defineEslintConfigOverride({
	files: codeFiles,

	plugins: ['react-hooks'],

	extends: ['plugin:react-hooks/recommended'],

	rules: {
		'react-hooks/rules-of-hooks': 2,
		'react-hooks/exhaustive-deps': 1,
	},
} as const)
