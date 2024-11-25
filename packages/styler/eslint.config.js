// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! cannot use defineEslintFlatConfig - would introduce circular dependency
// import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

export default defineEslintFlatConfig(
	...baseConfig,
	{
		// env: {
		// 	node: true
		// },

		rules: {
			// 'import/extensions': ['error', 'ignorePackages']
			// 'file-extension-in-import-ts/file-extension-in-import-ts': 'error',
			// '@voltiso/file-extension-in-import': ['error', 'always']

			'node-dependencies/absolute-version': 'off',
		},
	},
	{
		files: [
			'**/no-strictNullChecks/**/*',
			'**/no-exactOptionalPropertyTypes/**/*',
		],

		rules: {
			'@typescript-eslint/no-unnecessary-condition': 0, // requires `strictNullChecks`
			'sonarjs/prefer-nullish-coalescing': 0, // requires `strictNullChecks`
			'sonarjs/no-redundant-optional': 0,
			'jest/prefer-importing-jest-globals': 0, // `toHaveStyle` does not work with this
		},
	},
)
