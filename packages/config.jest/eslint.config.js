// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

export default [
	...baseConfig,
	{
		rules: {
			'node-dependencies/absolute-version': 'off',
		},
	},
]
