// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import testingLibraryPlugin from 'eslint-plugin-testing-library'

import { testFiles } from '~/detail/files'

const allRules = getAllRules(
	testingLibraryPlugin as never,
	'testing-library',
	'warn',
)

delete allRules['testing-library/consistent-data-testid']

export const testingLibrary = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(testingLibraryPlugin.configs.react, {
	// 	'testing-library': testingLibraryPlugin,
	// }),
	{
		files: testFiles,

		plugins: {
			'testing-library': testingLibraryPlugin as never,
		},

		// extends: ['plugin:testing-library/react'],

		rules: {
			...allRules,

			// 'testing-library/consistent-data-testid': 'off',
		},
	},
)
