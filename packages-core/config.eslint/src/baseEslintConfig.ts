// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfig } from '@voltiso/config.eslint.lib'

import { codeFiles } from '~/detail/files'

import { ignorePatterns } from './detail/ignorePatterns'
import {
	additionalMarkdownOverrides,
	anyOverride,
	arrayFunc,
	chaiFriendly,
	codeOverride,
	cypress,
	destructuring,
	// disableAutofix, // angular dep?! :(
	editorconfig,
	es,
	eslintComments,
	etcOverride,
	extOverride,
	// filenames,
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
	// indentEmptyLines,
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
	noOnlyTests,
	noSecrets,
	notice,
	noticeHash,
	noUnsanitized,
	noUseExtendNative,
	nOverride,
	// optimizeRegex,
	// preferArrow,
	prettierOverride,
	promise,
	putoutOverride,
	react,
	reactHooks,
	reactNative,
	reactNativeGlobals,
	regexOverride,
	regexpOverride,
	rxjs,
	security,
	simpleImportSort,
	sonar,
	// sortClassMembers,
	// sortKeysFix,
	storybook,
	switchCase,
	testingLibrary,
	testOverride,
	toml,
	tsdoc,
	typescriptSortKeys,
	unicorn,
	unusedImports,
	voltisoOverride,
	// wokeOverride,
	yaml,
} from './detail/overrides'

// const restrictedGlobals = require('confusing-browser-globals') // CRA config already does this

// const tsconfigPath = findTsconfigPathSync(process.cwd())

// const rulesHandledByPrettier = {
// 	'arrow-parens': 0,
// 	'function-paren-newline': 0,
// 	'implicit-arrow-linebreak': 0,
// 	'no-multiple-empty-lines': 0,
// 	'no-tabs': 0,
// 	'@typescript-eslint/space-before-function-paren': 0,
// 	'max-len': 0,
// 	'array-element-newline': 0,
// 	'lines-around-comment': 0, // conflict
// 	'object-property-newline': 0, // conflict
// 	'curly': 0,
// 	'dot-location': 0,
// }

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
		'max-lines': 0,
		'capitalized-comments': 0,

		// ...rulesHandledByPrettier,
	},

	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},

		jsxPragma: null as never, // for @typescript/eslint-parser

		ecmaVersion: 'latest',

		project: ['tsconfig.json', 'packages/*/tsconfig.json'], //! you may want to override this
		// project: tsconfigPath, //! you may want to override this
		// tsconfigRootDir: __dirname, //! you may want to override this
		sourceType: 'module',
	},

	settings: {
		react: {
			version: 'detect',
		},

		'import/parsers': {
			'@typescript-eslint/parser': codeFiles.map(s => s.slice(1)),
		},

		'import/ignore': ['node_modules/react-native/index\\.js$'],

		'import/extensions': codeFiles.map(s => s.slice(1)),

		'import/resolver': {
			// node: {
			// 	extensions: [
			// 		'.ts',
			// 		'.tsx',
			// 		'.mts',
			// 		'.mtsx',
			// 		'.cts',
			// 		'.ctsx',
			// 		//
			// 		'.js',
			// 		'.jsx',
			// 		'.mjs',
			// 		'.mjsx',
			// 		'.cjs',
			// 		'.cjsx',
			// 	],
			// },

			typescript: {
				/**
				 * Always try to resolve types under `<root>@types` directory even it
				 * doesn't contain any source code, like `@types/unist`
				 */
				alwaysTryTypes: true,

				// project: 'packages/*/tsconfig.json',
			},
		},
	},

	overrides: [
		// fpOverride, // crap
		// functional, // crap
		// wokeOverride, // learned all the words already and enriched my vocabulary
		// sortClassMembers,
		// indentEmptyLines,
		// i18nJson,
		// disableAutofix, // angular dep?! :(

		// Configs / plugins
		githubOverride,
		react,
		reactHooks,
		reactNative,
		reactNativeGlobals,

		// Plugins
		arrayFunc,
		etcOverride,
		extOverride,
		jsdocOverride,
		putoutOverride,
		notice, // has to be before `json`
		noticeHash, // has to be after `notice`
		// filenames,
		nOverride,
		destructuring,
		importOverride,
		unicorn,
		// optimizeRegex,
		// preferArrow,
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
		// sortKeysFix,
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
		i18n,
		i18next,
		formatMessage,
		formatJs,
		i18nText,
		es,

		/** Null parser - parses anything */
		anyOverride,

		codeOverride,
		chaiFriendly,
		testOverride, // has to be after `fp`
		noOnlyTests,

		markdownOverride,

		jsonc,
		json, // has to be after `jsonc`
		toml,
		yaml,

		prettierOverride,

		voltisoOverride,

		// /** `js` (no `ts`) */
		// {
		// 	files: ['*.js', '*.jsx', '*.cjs', '*.cjsx', '*.mjs', '*.mjsx'],
		// },

		/** `ts` (no `js`) */
		{
			files: ['*.ts', '*.tsx', '*.cts', '*.ctsx', '*.mts', '*.mtsx'],

			rules: {
				'jsdoc/require-param-type': 0,
				'jsdoc/require-returns-type': 0,

				'editorconfig/indent': 0, // does not work with type args
				'no-use-before-define': 0, // types can be used before define

				'jsdoc/check-param-names': 0,
			},
		},

		// `cjs` (js/ts)
		{
			files: [
				'*.cjs',
				'*.cjsx',
				'*.cts',
				'*.ctsx',
				'next.config.js', // has to be `.js` for `@next/bundle-analyzer` to work :(
			],

			parserOptions: {
				sourceType: 'script',
			},

			rules: {
				'@typescript-eslint/no-var-requires': 0,
				'import/no-commonjs': 0,
				strict: ['warn', 'global'],
				'unicorn/prefer-module': 0,
			},
		},

		// `jsx`/`tsx`
		{
			files: ['*.tsx', '*.jsx', '*.mtsx', '*.ctsx', '*.mjsx', '*.cjsx'],

			rules: {
				'import/no-nodejs-modules': 1,
			},
		},

		...additionalMarkdownOverrides,
	],
} as const)
