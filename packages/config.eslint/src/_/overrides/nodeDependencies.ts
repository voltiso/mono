// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

const possibleErrors = {
	'node-dependencies/compat-engines': 2,
	'node-dependencies/no-dupe-deps': 2,
	'node-dependencies/valid-semver': 2,
}

const bestPractices = {
	'node-dependencies/absolute-version': ['error', 'never'],
	'node-dependencies/no-deprecated': 2,
	'node-dependencies/no-restricted-deps': 2,
}

const stylisticIssues = {
	'node-dependencies/prefer-caret-range-version': 2,
	'node-dependencies/prefer-tilde-range-version': 2,
}

export const nodeDependencies = {
	extends: ['plugin:node-dependencies/recommended'],

	files: ['*'],

	plugins: ['node-dependencies'],

	rules: {
		...possibleErrors,
		...bestPractices,
		...stylisticIssues,
	},
}
