// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line no-restricted-imports
import baseConfig from '../../eslint.config.js'

// eslint-disable-next-line import/no-anonymous-default-export
export default [
	...baseConfig,
	{
		rules: {
			'node-dependencies/absolute-version': 'off',
		},
	},
]
