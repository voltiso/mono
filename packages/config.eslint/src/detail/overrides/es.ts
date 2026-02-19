// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'
import { getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import esPlugin from 'eslint-plugin-es-x'

// console.log('!!!', Object.keys(esPlugin.configs))

// console.log('!!!', baseConfig)

export const es = defineConfig(
	{
		plugins: {
			'es-x': esPlugin,
		},
	},
	{
		rules: {
			...getAllRules(esPlugin as never, 'es-x', 'off'),
		},
	},
)
