// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { testFiles } from '~/detail/files'

// @ts-expect-error no typings
import testingLibraryPlugin from 'eslint-plugin-testing-library'
import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'

export const testingLibrary = defineEslintFlatConfig(
  ...eslintFlatConfigFromConfig(testingLibraryPlugin.configs.react, {'testing-library': testingLibraryPlugin}),
	{
		files: testFiles,

		// plugins: ['testing-library'],
		plugins: {
			'testing-library': testingLibraryPlugin as never,
		},

		// extends: ['plugin:testing-library/react'],
	} as const,
)
