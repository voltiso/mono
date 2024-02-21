// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line n/no-extraneous-import
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

export default defineEslintFlatConfig(...baseConfig, {
	files: ['**/strictNullChecks/test-false/**/*'],

	rules: {
		'@typescript-eslint/no-unnecessary-condition': 0, // requires `strictNullChecks`
	},
})
