// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverrideRules,
	defineEslintFlatConfig,
	eslintFlatConfigFromConfig,
} from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import nodeDependenciesPlugin from 'eslint-plugin-node-dependencies'
import jsoncEslintParser from 'jsonc-eslint-parser'

const possibleErrors = defineEslintConfigOverrideRules({
	'node-dependencies/compat-engines': 0, // bugged
	'node-dependencies/no-dupe-deps': 2,
	'node-dependencies/valid-semver': 1, // does not pass: "chalk": "^4.1.2 || 5_is_esm_only"
})

const bestPractices = defineEslintConfigOverrideRules({
	'node-dependencies/absolute-version': ['warn', 'never'],
	'node-dependencies/no-deprecated': 1,
	'node-dependencies/no-restricted-deps': 1,
})

const stylisticIssues = defineEslintConfigOverrideRules({
	'node-dependencies/prefer-caret-range-version': 0,
	'node-dependencies/prefer-tilde-range-version': 0,
})

// console.log('???', nodeDependenciesPlugin.configs.recommended)

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const nodeDependenciesConfigRecommended =
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	nodeDependenciesPlugin.configs.recommended
// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
for (const override of nodeDependenciesConfigRecommended.overrides) {
	// eslint-disable-next-line @typescript-eslint/strict-boolean-expressions, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
	if (override.parser.includes('jsonc-eslint-parser')) {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		override.parser = jsoncEslintParser
	}
}

export const nodeDependencies = defineEslintFlatConfig(
	...eslintFlatConfigFromConfig(nodeDependenciesConfigRecommended as never, {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		'node-dependencies': nodeDependenciesPlugin,
	}),
	{
		// extends: ['plugin:node-dependencies/recommended'],

		// files: ['*'],

		// plugins: ['node-dependencies'],

		rules: {
			...possibleErrors,
			...bestPractices,
			...stylisticIssues,
		},
	},
)
