// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { testFiles } from '~/detail/files'

// @ts-expect-error no typings
import noOnlyTestsPlugin from 'eslint-plugin-no-only-tests'

export const noOnlyTests = defineEslintFlatConfig({
	files: testFiles,

	// plugins: ['no-only-tests'],
	plugins: {
		'no-only-tests': noOnlyTestsPlugin,
	},

	settings: {
		'no-only-tests/no-only-tests': 1,
	},
} as const)
