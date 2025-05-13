// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import cypressPlugin from 'eslint-plugin-cypress'

// console.log('!!!', cypressPlugin.configs.recommended)

export const cypress = defineEslintFlatConfig(
	// ...eslintFlatConfigFromConfig(baseConfig, { cypress: cypressPlugin }),
	{
		// files: ['*'],

		// plugins: ['cypress'],
		plugins: {
			cypress: cypressPlugin as never,
		},

		// extends: ['plugin:cypress/recommended'],

		languageOptions: {
			globals: {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				...(cypressPlugin.environments.globals.globals as {}),
			},
		},

		rules: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			...(cypressPlugin.configs.recommended.rules as {}),

			'cypress/no-assigning-return-values': 'error',
			'cypress/no-unnecessary-waiting': 'error',
			'cypress/assertion-before-screenshot': 'warn',
			'cypress/no-force': 'warn',
			'cypress/no-async-tests': 'error',
			'cypress/no-pause': 'error',
		},
	},
)
