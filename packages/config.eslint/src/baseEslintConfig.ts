// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfig } from '@voltiso/config.eslint.lib'

import { ignorePatterns } from './_/ignorePatterns.js'
import {
	anyOverride,
	arrayFunc,
	chaiFriendly,
	codeOverride,
	cypress,
	// disableAutofix, // angular dep?! :(
	editorconfig,
	eslintComments,
	etcOverride,
	extOverride,
	filenames,
	formatJs,
	formatMessage,
	// fpOverride,
	// functional,
	githubOverride,
	html,
	i18n,
	i18next,
	i18nText,
	importOverride,
	// i18nJson,
	indentEmptyLines,
	jsdocOverride,
	json,
	jsonc,
	jsx,
	jsxAlly,
	markdownOverride,
	next,
	noConstructorBind,
	nodeDependencies,
	noExplicitTypeExports,
	noSecrets,
	notice,
	noticeHash,
	noUnsanitized,
	noUseExtendNative,
	nOverride,
	optimizeRegex,
	preferArrow,
	prettierOverride,
	promise,
	putoutOverride,
	react,
	reactNative,
	regexOverride,
	regexpOverride,
	rxjs,
	security,
	simpleImportSort,
	sonar,
	sortClassMembers,
	sortKeysFix,
	storybook,
	switchCase,
	testingLibrary,
	testOverride,
	toml,
	tsdoc,
	typescriptSortKeys,
	unicorn,
	unusedImports,
	wokeOverride,
	yaml,
} from './_/overrides'

// const restrictedGlobals = require('confusing-browser-globals') // CRA config already does this

export const baseEslintConfig = defineEslintConfig({
	// root: true, // ! override this explicitly

	env: {
		browser: true,
		es2022: true,
		node: true,
	},

	ignorePatterns,

	extends: ['eslint:all'],

	rules: {
		//
	},

	overrides: [
		// Configs / plugins
		githubOverride,
		react,
		reactNative,

		// Plugins
		arrayFunc,
		etcOverride,
		extOverride,
		// fpOverride, // crap
		// functional, // crap
		jsdocOverride,
		putoutOverride,
		notice, // has to be before `json`
		noticeHash, // has to be after `notice`
		filenames,
		nOverride,
		importOverride,
		wokeOverride,
		unicorn,
		optimizeRegex,
		preferArrow,
		promise,
		regexOverride,
		regexpOverride,
		rxjs,
		eslintComments,
		nodeDependencies,
		noUseExtendNative,
		jsxAlly,
		sonar,
		noConstructorBind,
		noExplicitTypeExports,
		noSecrets,
		noUnsanitized,
		security,
		sortClassMembers,
		sortKeysFix,
		switchCase,
		tsdoc,
		typescriptSortKeys,
		unusedImports,
		cypress,
		html,
		testingLibrary,
		next,
		simpleImportSort,
		storybook,
		jsx,
		editorconfig,
		indentEmptyLines,
		i18n,
		i18next,
		// i18nJson,
		formatMessage,
		formatJs,
		i18nText,
		// disableAutofix, // angular dep?! :(

		/** Null parser - parses anything */
		anyOverride,

		codeOverride,
		chaiFriendly,
		testOverride, // has to be after `fp`

		markdownOverride,

		jsonc,
		json, // has to be after `jsonc`
		toml,
		yaml,

		prettierOverride,

		/** `js` (no `ts`) */
		{
			files: ['*.js', '*.jsx', '*.cjs', '*.cjsx', '*.mjs', '*.mjsx'],
		},

		/** `ts` (no `js`) */
		{
			files: ['*.ts', '*.tsx', '*.cts', '*.ctsx', '*.mts', '*.mtsx'],

			rules: {
				'jsdoc/require-param-type': 0,
				'jsdoc/require-returns-type': 0,

				'editorconfig/indent': 0, // does not work with type args
				'no-use-before-define': 0, // types can be used before define
			},
		},

		// `cjs` (js/ts)
		{
			files: ['*.cjs', '*.cjsx', '*.cts', '*.ctsx'],

			parserOptions: {
				sourceType: 'script',
			},

			rules: {
				'@typescript-eslint/no-var-requires': 0,
				'import/no-commonjs': 0,
				strict: ['error', 'global'],
			},
		},

		// `jsx`/`tsx`
		{
			files: ['*.tsx', '*.jsx', '*.mtsx', '*.ctsx', '*.mjsx', '*.cjsx'],

			rules: {
				'import/no-nodejs-modules': 2,
			},
		},
	],
})
