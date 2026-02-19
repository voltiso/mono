// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

// eslint-disable-next-line no-restricted-imports, import/no-relative-packages
import baseConfig from '../../eslint.config.js'

const config = defineConfig(...baseConfig, {
	rules: {
		'n/hashbang': 0,
		'n/shebang': 0,
	},
})

export default config
