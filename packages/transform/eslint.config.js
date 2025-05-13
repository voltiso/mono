// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! cannot use defineEslintFlatConfig - would introduce circular dependency
// import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

const config = [
	...baseConfig,
	{
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
	},
]

export default config
