// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import nextPlugin from '@next/eslint-plugin-next'
import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'

// console.log('!!!', nextPlugin.configs['core-web-vitals'])

const coreWebVitalsConfig = {...nextPlugin.configs['core-web-vitals']}
delete coreWebVitalsConfig.extends

export const next = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(nextPlugin.configs.recommended, {'@next/next': nextPlugin}),
	...eslintFlatConfigFromConfig(coreWebVitalsConfig, {'@next/next': nextPlugin}),
	{
		// files: ['*'],

		// extends: [
		// 	// 'next',
		// 	// 'next/core-web-vitals',
		// 	'plugin:@next/next/recommended',
		// 	'plugin:@next/next/core-web-vitals',
		// 	//
		// ],

		// plugins: ['@next/eslint-plugin-next'],
		plugins: {
			next: nextPlugin,
		},
	} as const,
)
