// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! cannot use defineEslintFlatConfig - would introduce circular dependency
// import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	...baseConfig,
	{
		// env: {
		// 	node: true
		// },
		rules: {
			// 'import/extensions': ['error', 'ignorePackages']

			// TODO: make this work with `import type`
			'file-extension-in-import-ts/file-extension-in-import-ts': [
				'error',
				'always',
				{
					extMapping: { '.ts': '.js' },
				},
			],
		},
	},
]
