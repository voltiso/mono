// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

// eslint-disable-next-line no-restricted-imports, import/no-relative-packages
import baseConfig from '../../eslint.config.js'

export default defineConfig(...baseConfig, {
	// settings: {
	// 	convertPath: {
	// 		'**/~/**/*': ['^.*\\~(.*)$', './$1'],
	// 	},
	// },

	// env: {
	// 	node: true
	// },

	rules: {
		// 'import/extensions': ['error', 'ignorePackages']
		'file-extension-in-import-ts/file-extension-in-import-ts': 'error',
		// '@voltiso/file-extension-in-import': ['error', 'always'],

		// 'n/no-extraneous-import': 0,

		// 'n/no-extraneous-import': [
		// 	'warn',
		// 	{
		// 		convertPath: {
		// 			'**/~/**': ['^.*~(.*)$', '$1'],
		// 		},
		// 	},
		// ],
	},
})
