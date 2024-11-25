// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// ! cannot use defineEslintFlatConfig - would introduce circular dependency
// import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

const config = [
	...baseConfig,
	{
		// env: {
		// 	node: true
		// },
		rules: {
			'node-dependencies/absolute-version': 'off',
			'n/hashbang': 'off',
			'n/shebang': 'off',
		},
	},
]

export default config
