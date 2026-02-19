// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// eslint-disable-next-line no-restricted-imports, import/no-relative-packages
import baseConfig from '../../eslint.config.js'

const config = [
	...baseConfig,
	{
		rules: {
			'node-dependencies/absolute-version': 'off',
		},

		languageOptions: {
			sourceType: 'module',
		},
	},
]

export default config
