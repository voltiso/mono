// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	defineEslintConfigOverrideRules,
} from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

const staticAnalysisRules = defineEslintConfigOverrideRules({
	// 'import/no-unresolved': 0, // handled by TS
	// 'import/no-unresolved': ['error', { caseSensitiveStrict: true }],

	'import/no-relative-packages': 2,

	'import/no-useless-path-segments': 0,
	'@voltiso/no-useless-path-segments': ['warn', { noUselessIndex: true }],
	// 'import/no-useless-path-segments': ['warn', { noUselessIndex: true }],

	'import/default': 1, //! TS does the same?
	'import/no-restricted-paths': 1,
	'import/no-absolute-path': 1,
	'import/no-dynamic-require': 1,
	'import/no-self-import': 1,

	'import/named': 0, // buggy when using import from '~' (tsconfig -> paths)?
	'import/namespace': 0, // buggy when using custom "paths" in `tsconfig.json`
	'import/no-internal-modules': 0, //! hmm... configure and enable?
	'import/no-webpack-loader-syntax': 0,
	'import/no-cycle': 0, //! hmm... might be useful !

	// 'import/no-relative-parent-imports': 1, // use 'no-restricted-imports' instead
})

const helpfulWarningsRules = defineEslintConfigOverrideRules({
	'import/export': 1,
	'import/no-named-as-default': 1, // TS does not do this
	'import/no-named-as-default-member': 1, //! TS does the same?
	'import/no-deprecated': 1, // TS does not do this
	'import/no-mutable-exports': 1,
	'import/no-unused-modules': 1, // TS does not do this

	'import/no-extraneous-dependencies': 0, // buggy with non-relative paths duplicate across projects in monorepo
})

const moduleSystemsRules = defineEslintConfigOverrideRules({
	'import/unambiguous': 1,
	'import/no-commonjs': 1,
	'import/no-amd': 1,
	'import/no-import-module-exports': 1,

	'import/no-nodejs-modules': 0,
})

const styleGuideRules = defineEslintConfigOverrideRules({
	'import/first': 1,

	'import/exports-last': 0,
	'import/no-duplicates': 0, // simple-import-sort
	'import/no-namespace': 0,
	'import/extensions': 0, // handled by eslint-plugin-n + PATCH

	'import/newline-after-import': 1,
	'import/no-unassigned-import': 1,
	'import/no-named-default': 1,
	'import/no-default-export': 1, // named exports are better!
	'import/no-anonymous-default-export': 1,
	'import/dynamic-import-chunkname': 1,

	// 'import/extensions': [
	// 	'warn',
	// 	'always',
	// 	// {js: 'never', ts: 'never'},
	// 	Object.fromEntries(codeFiles.map(ext => [ext.slice(2), 'never'])),
	// ],

	// 'import/extensions': [
	// 	'error',
	// 	'ignorePackages',
	// 	{
	// 		'': 'never',
	// 		ts: 'never',
	// 		tsx: 'never',
	// 	},
	// ],

	'import/order': 0, //! hmm... using simple-import-fix - but wondering if this would work better?
	'import/prefer-default-export': 0, // named exports are better!
	'import/max-dependencies': 0,
	'import/no-named-export': 0, // meh
	'import/group-exports': 0,
})

export const importOverride = defineEslintConfigOverride({
	extends: [
		'plugin:import/recommended',
		'plugin:import/warnings',
		'plugin:import/errors',
		'plugin:import/typescript',
	],

	files: codeFiles,

	plugins: ['import'],

	rules: {
		...staticAnalysisRules,
		...helpfulWarningsRules,
		...moduleSystemsRules,
		...styleGuideRules,
	},
} as const)
