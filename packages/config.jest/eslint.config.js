// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import baseConfig from '../../eslint.config.js'

export default [
	baseConfig,
	{
		rules: {
			'node-dependencies/absolute-version': 'off',
		},
	},
]
