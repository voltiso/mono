// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	defineEslintConfigOverrideRules,
} from '@voltiso/config.eslint.lib'

const possibleErrors = defineEslintConfigOverrideRules({
	'node-dependencies/compat-engines': 0, // bugged
	'node-dependencies/no-dupe-deps': 2,
	'node-dependencies/valid-semver': 2,
})

const bestPractices = defineEslintConfigOverrideRules({
	'node-dependencies/absolute-version': ['error', 'never'],
	'node-dependencies/no-deprecated': 2,
	'node-dependencies/no-restricted-deps': 2,
})

const stylisticIssues = defineEslintConfigOverrideRules({
	'node-dependencies/prefer-caret-range-version': 2,
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
})