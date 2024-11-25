// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests'

import { testFiles } from '~/detail/files'

export const noOnlyTests = defineEslintFlatConfig({
	files: testFiles,

	// plugins: ['no-only-tests'],
	plugins: {
		'no-only-tests': noOnlyTestsPlugin as never,
	},

	settings: {
		'no-only-tests/no-only-tests': 1,
	},
})
