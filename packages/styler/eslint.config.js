// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

import baseConfig from '@~/workspace/eslint.config.js'

export default defineConfig(
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
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 0, // requires `strictNullChecks`
			'@typescript-eslint/no-useless-default-assignment': 0, // requires `strictNullChecks`
			'jest/no-unnecessary-assertion': 0, // requires `strictNullChecks`
		},
	},
)
