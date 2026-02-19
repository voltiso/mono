// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore CJS build fails
import tomlPlugin from 'eslint-plugin-toml'

export const toml = defineConfig({
	files: ['*.toml', '**/*.toml'],

	plugins: {
		toml: tomlPlugin as never,
	},

	language: 'toml/toml',

	rules: {
		...getAllRules(tomlPlugin, 'toml', 'warn'),
	},
})
