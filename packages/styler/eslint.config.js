// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! cannot use defineEslintFlatConfig - would introduce circular dependency
// import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// eslint-disable-next-line no-restricted-imports, @voltiso/file-extension-in-import
import baseConfig from '../../eslint.config.js'

const config = [
	...baseConfig,
	{
		// env: {
		// 	node: true
		// },
		rules: {
			// 'import/extensions': ['error', 'ignorePackages']
			'file-extension-in-import-ts/file-extension-in-import-ts': 'error',
			// '@voltiso/file-extension-in-import': ['error', 'always']

			'node-dependencies/absolute-version': 'off',
		},
	},
]

export default config
