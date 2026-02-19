// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import nextPlugin from '@next/eslint-plugin-next'
import { defineConfig } from 'eslint/config'
import { getAllRules } from '@voltiso/config.eslint.lib'

// console.log('!!!', nextPlugin.configs['core-web-vitals'])

// const coreWebVitalsConfig = { ...nextPlugin.configs['core-web-vitals'] }
// delete coreWebVitalsConfig.extends

export const next = defineConfig(
	// ...eslintFlatConfigFromConfig(nextPlugin.configs.recommended, {
	// 	'@next/next': nextPlugin,
	// }),
	// ...eslintFlatConfigFromConfig(coreWebVitalsConfig, {
	// 	'@next/next': nextPlugin,
	// }),
	{
		// files: ['*'],

		// extends: [
		// 	// 'next',
		// 	// 'next/core-web-vitals',
		// 	'plugin:@next/next/recommended',
		// 	'plugin:@next/next/core-web-vitals',
		// 	//
		// ],

		plugins: {
			next: nextPlugin as never,
		},

		rules: {
			...getAllRules(nextPlugin as never, 'next', 'warn'),
		},
	},
)
