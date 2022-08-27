// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { tsFiles } from '~/detail/files'

export const tsdoc = defineEslintConfigOverride({
	files: tsFiles,

	plugins: ['tsdoc'],

	rules: {
		'tsdoc/syntax': 1,
	},
} as const)
