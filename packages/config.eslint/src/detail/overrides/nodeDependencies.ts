// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	defineEslintConfigOverrideRules,
} from '@voltiso/config.eslint.lib'

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

export const nodeDependencies = defineEslintConfigOverride({
	extends: ['plugin:node-dependencies/recommended'],

	files: ['*'],

	plugins: ['node-dependencies'],

	rules: {
		...possibleErrors,
		...bestPractices,
		...stylisticIssues,
	},
} as const)
