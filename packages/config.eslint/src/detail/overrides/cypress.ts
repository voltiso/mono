// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { defineEslintFlatConfig } from '@voltiso/config.eslint.lib'

// @ts-expect-error no typings
import cypressPlugin from 'eslint-plugin-cypress'

// console.log('!!!', cypressPlugin.configs.recommended)

const baseConfig = {...cypressPlugin.configs.recommended}
delete baseConfig.env
baseConfig.languageOptions ||= {}
baseConfig.languageOptions.globals || {}
baseConfig.languageOptions.globals = cypressPlugin.environments.globals.globals

export const cypress = defineEslintFlatConfig(
  ...eslintFlatConfigFromConfig(baseConfig, {'cypress': cypressPlugin}),
	{
		// files: ['*'],

		// plugins: ['cypress'],

		// extends: ['plugin:cypress/recommended'],

		rules: {
			'cypress/no-assigning-return-values': 'error',
			'cypress/no-unnecessary-waiting': 'error',
			'cypress/assertion-before-screenshot': 'warn',
			'cypress/no-force': 'warn',
			'cypress/no-async-tests': 'error',
			'cypress/no-pause': 'error',
		},
	} as const,
)
