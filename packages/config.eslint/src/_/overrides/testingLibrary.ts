// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { testFiles } from '~/_/files'

export const testingLibrary = defineEslintConfigOverride({
	files: testFiles,

	plugins: ['testing-library'],

	extends: ['plugin:testing-library/react'],
} as const)
