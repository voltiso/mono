// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

// eslint-disable-next-line no-restricted-imports, import/no-relative-packages
import baseConfig from '../../eslint.config.js'

export default defineConfig(
	...baseConfig,
	{
		rules: {
			'jest/prefer-ending-with-an-expect': 0, // too many errors... not time to fix, we have fake type-tests
		},
	},
	{
		files: ['**/strictNullChecks/test-false/**/*'],

		rules: {
			'@typescript-eslint/no-unnecessary-condition': 0, // requires `strictNullChecks`
			'sonarjs/prefer-nullish-coalescing': 0, // requires `strictNullChecks`
			'@typescript-eslint/no-useless-default-assignment': 0, // requires `strictNullChecks`
			'@typescript-eslint/no-unnecessary-boolean-literal-compare': 0, // requires `strictNullChecks`
			'jest/no-unnecessary-assertion': 0, // requires `strictNullChecks`
		},
	},
	{
		files: ['**/exactOptionalPropertyTypes/test-false/**/*'],

		rules: {
			'sonarjs/no-redundant-optional': 0, // requires `strictNullChecks`
		},
	},
)
