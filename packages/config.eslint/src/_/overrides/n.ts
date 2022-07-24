// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	defineEslintConfigOverrideRules,
} from '@voltiso/config.eslint.lib'

const nRulesPossibleErrors = defineEslintConfigOverrideRules({
	'n/handle-callback-err': 2,
	'n/no-callback-literal': 2,
	'n/no-exports-assign': 2,
	'n/no-extraneous-import': 2,
	'n/no-extraneous-require': 2,
	'n/no-missing-import': 0, // handled by `import/no-unresolved` instead (works better for `index.js` files)
	'n/no-missing-require': 2,
	'n/no-new-require': 2,
	'n/no-path-concat': 2,
	'n/no-process-exit': 2,
	'n/no-unpublished-bin': 2,

	'n/no-unpublished-import': 0, // buggy?
	'n/no-unpublished-require': 0,

	'n/no-unsupported-features/es-builtins': 2,
	'n/no-unsupported-features/es-syntax': 0, //! disabled
	'n/no-unsupported-features/node-builtins': 2,
	'n/process-exit-as-throw': 2,
	'n/shebang': 2,
	//

	// 'n/no-unpublished-require': 2, //! DISABLE?
})

const nRulesBestPractices = defineEslintConfigOverrideRules({
	'n/no-deprecated-api': 2,
})

const nRulesStylisticIssues = defineEslintConfigOverrideRules({
	'n/callback-return': 2,
	'n/exports-style': 2,

	'n/file-extension-in-import': [
		'error',
		'always',
		// {
		// 	'.js': 'always',
		// 	'.ts': 'never',
		// 	'.tsx': 'never',
		// },
	],

	'n/global-require': 2,
	'n/no-mixed-requires': 2,
	'n/no-process-env': 2,
	'n/no-restricted-import': 2,
	'n/no-restricted-require': 2,
	'n/no-sync': 2,
	'n/prefer-global/buffer': 2,
	'n/prefer-global/console': 2,
	'n/prefer-global/process': 2,
	'n/prefer-global/text-decoder': 2,
	'n/prefer-global/text-encoder': 2,
	'n/prefer-global/url': 2,
	'n/prefer-global/url-search-params': 2,
	'n/prefer-promises/dns': 2,
	'n/prefer-promises/fs': 2,
})

const nRules = defineEslintConfigOverrideRules({
	...nRulesPossibleErrors,
	...nRulesBestPractices,
	...nRulesStylisticIssues,
})

export const nOverride = defineEslintConfigOverride({
	extends: ['plugin:n/recommended'],

	files: ['*'],

	plugins: ['n'],

	rules: nRules,
})
