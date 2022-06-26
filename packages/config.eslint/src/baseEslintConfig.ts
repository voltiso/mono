// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable sort-keys-fix/sort-keys-fix */

import { ignorePatterns } from './_/ignorePatterns.js'
import {
	anyOverride,
	// eslint-disable-next-line unicorn/prevent-abbreviations
	arrayFunc,
	chaiFriendly,
	codeOverride,
	cypress,
	editorconfig,
	eslintComments,
	etcOverride,
	// eslint-disable-next-line unicorn/prevent-abbreviations
	extOverride,
	filenames,
	fpOverride,
	functional,
	githubOverride,
	html,
	importOverride,
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
import type { EslintConfig } from './EslintConfig.js'

// Const restrictedGlobals = require('confusing-browser-globals') // CRA config already does this

const config = {
	// root: true, // ! override this explicitly

	env: {
		browser: true,
		es2022: true,
		node: true,
	},

	ignorePatterns,

	extends: ['eslint:all'],

	overrides: [
		anyOverride,

		codeOverride,

		// Configs / plugins
		githubOverride,

		react,
		reactNative,

		testOverride,

		markdownOverride,

		// Plugins
		arrayFunc,
		etcOverride,
		extOverride,
		fpOverride,
		functional,
		importOverride,
		jsdocOverride,
		putoutOverride,
		notice, // has to be before `json`
		filenames,
		nOverride,
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

		json,
		jsonc,
		toml,
		yaml,

		chaiFriendly,
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
} as const

export type BaseEslintConfig = typeof config & EslintConfig
export const baseEslintConfig = config as BaseEslintConfig
