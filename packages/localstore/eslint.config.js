// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

import baseConfig from '@~/workspace/eslint.config.js'

export default defineConfig(...baseConfig, {
	// env: {
	// 	node: true
	// },
	rules: {
		// 'import/extensions': ['error', 'ignorePackages']

		// does not work with `import type`
		// 'file-extension-in-import-ts/file-extension-in-import-ts': [
		// 	'error',
		// 	'always',
		// 	{
		// 		extMapping: { '.ts': '.js' },
		// 	},
		// ],

		'import/extensions': 'off',

		'@voltiso/file-extension-in-import': [
			'error',
			'always',
			{ includeTypeOnly: true },
		],
	},
})
