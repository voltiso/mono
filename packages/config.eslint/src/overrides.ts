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
	turbo,
	typescriptSortKeys,
	unicorn,
	unusedImports,
	voltisoOverride,
	// wokeOverride,
	yaml,
} from './detail/overrides/index.js'

export const overrides = [
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

	turbo,

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
			'unicorn/prefer-module': 0,
		},
	},

	// `cjs` (js-only)
	{
		files: [
			'*.cjs',
			'*.cjsx',
			'next.config.js', // has to be `.js` for `@next/bundle-analyzer` to work :(
		],

		rules: {
			strict: ['warn', 'global'],
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
].flat() // .slice(0,1345)
