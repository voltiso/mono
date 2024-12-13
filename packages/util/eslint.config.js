// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! circular dependency
// import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

export default [
	...baseConfig,
	{
		files: ['**/strictNullChecks/test-false/**/*'],

		rules: {
			'@typescript-eslint/no-unnecessary-condition': 0, // requires `strictNullChecks`
			'sonarjs/prefer-nullish-coalescing': 0, // requires `strictNullChecks`
		},
	},
	{
		files: ['**/exactOptionalPropertyTypes/test-false/**/*'],

		rules: {
			'sonarjs/no-redundant-optional': 0, // requires `strictNullChecks`
		},
	},
]
