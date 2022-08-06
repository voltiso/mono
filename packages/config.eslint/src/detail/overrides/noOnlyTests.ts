// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'
import { testFiles } from '~/detail/files'

export const noOnlyTests = defineEslintConfigOverride({
	files: testFiles,

	plugins: ['no-only-tests'],

	settings: {
		'no-only-tests/no-only-tests': 1,
	},
} as const)
