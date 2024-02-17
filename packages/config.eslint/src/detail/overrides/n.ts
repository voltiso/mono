// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverrideRules,
	defineEslintFlatConfig,
} from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

import voltisoPlugin from '@voltiso/eslint-plugin'

// @ts-expect-error no typings
import nPlugin from 'eslint-plugin-n'
import { eslintFlatConfigFromConfig } from '@voltiso/config.eslint.lib'
import { EslintFlatConfig } from '@voltiso/config.eslint.lib'

const nRulesPossibleErrors = defineEslintConfigOverrideRules({
	'n/handle-callback-err': 1,
	'n/no-callback-literal': 1,
	'n/no-exports-assign': 1,
	'n/no-extraneous-import': 1,
	'n/no-extraneous-require': 1,
	'n/no-missing-import': 0, // handled by `import/no-unresolved` instead (works better for `index.js` files)
	'n/no-missing-require': 1,
	'n/no-new-require': 1,
	'n/no-path-concat': 1,
	'n/no-process-exit': 1,
	'n/no-unpublished-bin': 1,

	'n/no-unpublished-import': 0, // buggy?
	'n/no-unpublished-require': 0,

	'n/no-unsupported-features/es-builtins': 1,
	'n/no-unsupported-features/es-syntax': 0, //! disabled
	'n/no-unsupported-features/node-builtins': 1,
	'n/process-exit-as-throw': 1,
	'n/shebang': 1,
	//

	// 'n/no-unpublished-require': 1, //! DISABLE?
} as const)

const nRulesBestPractices = defineEslintConfigOverrideRules({
	'n/no-deprecated-api': 1,
} as const)

const nRulesStylisticIssues = defineEslintConfigOverrideRules({
	'n/callback-return': 1,
	'n/exports-style': 1,

	// 'n/file-extension-in-import': 1,

	// 'n/file-extension-in-import': [
	'@voltiso/file-extension-in-import': [
		'warn',
		'always',
		Object.fromEntries(codeFiles.map(ext => [ext.slice(1), 'never'])),
	],

	// 'n/file-extension-in-import': [
	// 	'error',
	// 	'always',
	// 	// {
	// 	// 	'.js': 'always',
	// 	// 	'.ts': 'never',
	// 	// 	'.tsx': 'never',
	// 	// },
	// ],

	'n/global-require': 1,
	'n/no-mixed-requires': 1,
	'n/no-process-env': 1,
	'n/no-restricted-import': 1,
	'n/no-restricted-require': 1,
	'n/no-sync': 1,
	'n/prefer-global/buffer': 1,
	'n/prefer-global/console': 1,
	'n/prefer-global/process': 1,
	'n/prefer-global/text-decoder': 1,
	'n/prefer-global/text-encoder': 1,
	'n/prefer-global/url': 1,
	'n/prefer-global/url-search-params': 1,
	'n/prefer-promises/dns': 1,
	'n/prefer-promises/fs': 1,
} as const)

const nRules = defineEslintConfigOverrideRules({
	...nRulesPossibleErrors,
	...nRulesBestPractices,
	...nRulesStylisticIssues,
} as const)

// console.log(nPlugin.configs.recommended.env)

export const nOverride: EslintFlatConfig[] = defineEslintFlatConfig(...eslintFlatConfigFromConfig(nPlugin.configs.recommended, {n: nPlugin}), {
	// extends: ['plugin:n/recommended'],

	// files: ['*'],

	// plugins: ['n'],
	plugins: {
		'@voltiso': voltisoPlugin
	},

	rules: nRules,
} as const) as never
