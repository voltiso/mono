// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineConfig } from 'eslint/config'

import { anyOverride } from './detail/overrides/any.js'
import { arrayFunc } from './detail/overrides/arrayFunc.js'
import { chaiFriendly } from './detail/overrides/chaiFriendly.js'
import { codeOverride } from './detail/overrides/code.js'
import { cypress } from './detail/overrides/cypress.js'
import { destructuringConfig } from './detail/overrides/destructuring.js'
import { es } from './detail/overrides/es.js'
import { eslintComments } from './detail/overrides/eslintComments.js'
import { etcConfig } from './detail/overrides/etc.js'
import { extOverride } from './detail/overrides/ext.js'
import { fileExtensionInImportTsConfig } from './detail/overrides/fileExtensionInImportTs.js'
import { formatJs } from './detail/overrides/formatJs.js'
import { i18nConfig } from './detail/overrides/i18n.js'
import { i18nextConfig } from './detail/overrides/i18next.js'
import { i18nText } from './detail/overrides/i18nText.js'
import { importConfig } from './detail/overrides/import.js'
import { jsdocConfig } from './detail/overrides/jsdoc.js'
import { jsoncConfig, jsonConfig } from './detail/overrides/json.js'
import { jsxAllyConfig } from './detail/overrides/jsxAlly.js'
import {
	additionalMarkdownOverrides,
	markdownConfig,
} from './detail/overrides/markdown.js'
import { nConfig } from './detail/overrides/n.js'
import { next } from './detail/overrides/next.js'
import { noConstructorBind } from './detail/overrides/noConstructorBind.js'
import { nodeDependencies } from './detail/overrides/nodeDependencies.js'
// import { noExplicitTypeExports } from './detail/overrides/_noExplicitTypeExports.ts_'
import { noOnlyTests } from './detail/overrides/noOnlyTests.js'
import { noSecrets } from './detail/overrides/noSecrets.js'
import { notice, noticeHash } from './detail/overrides/notice.js'
import { noUnsanitized } from './detail/overrides/noUnsanitized.js'
import { noUseExtendNative } from './detail/overrides/noUseExtendsNative.js'
import { prettierConfig } from './detail/overrides/prettier.js'
import { promise } from './detail/overrides/promise.js'
import { putoutOverride } from './detail/overrides/putout.js'
import { reactConfig } from './detail/overrides/react.js'
import { reactHooksConfig } from './detail/overrides/reactHooks.js'
import { reactNativeGlobals } from './detail/overrides/reactNativeGlobals.js'
import { regexConfig } from './detail/overrides/regex.js'
import { regexpConfig } from './detail/overrides/regexp.js'
import { rxjsConfig } from './detail/overrides/rxjs.js'
import { securityConfig } from './detail/overrides/security.js'
import { simpleImportSort } from './detail/overrides/simpleImportSort.js'
import { sonar } from './detail/overrides/sonar.js'
import { switchCase } from './detail/overrides/switchCase.js'
import { testingLibrary } from './detail/overrides/testingLibrary.js'
import { testOverride } from './detail/overrides/testOverride.js'
import { toml } from './detail/overrides/toml'
import { tsdoc } from './detail/overrides/tsdoc.js'
import { turboConfig } from './detail/overrides/turbo.js'
import { unicorn } from './detail/overrides/unicorn.js'
import { unusedImports } from './detail/overrides/unusedImports.js'
import { voltisoOverride } from './detail/overrides/voltiso.js'
import { yamlConfig } from './detail/overrides/yaml.js'

export const overrides = defineConfig(
	/** Null parser - parses anything */
	...anyOverride,

	// fpOverride, // crap
	// functional, // crap
	// wokeOverride, // learned all the words already and enriched my vocabulary
	// sortClassMembers,
	// indentEmptyLines,
	// i18nJson,
	// disableAutofix, // angular dep?! :(
	// filenames,
	// optimizeRegex,
	// preferArrow,
	// sortKeysFix,

	// Configs / plugins
	...reactConfig,
	...reactHooksConfig,
	...reactNativeGlobals,

	// Plugins
	...arrayFunc,
	...etcConfig,
	...extOverride,
	...jsdocConfig,
	...putoutOverride,
	...notice, // has to be before `json`
	...noticeHash, // has to be after `notice`
	...nConfig,
	...fileExtensionInImportTsConfig,
	...destructuringConfig,
	...importConfig,
	...unicorn,
	...promise,
	...regexConfig,
	...regexpConfig,
	...rxjsConfig,
	...eslintComments,
	...nodeDependencies,
	...noUseExtendNative,
	...jsxAllyConfig,
	...sonar,
	...noConstructorBind,
	// ...noExplicitTypeExports,
	...noSecrets,
	...noUnsanitized,
	...securityConfig,
	...switchCase,
	...tsdoc,
	// ...typescriptSortKeys,
	...unusedImports,
	...cypress,
	// html, // ! breaks everything - not sure why
	...testingLibrary,
	...next,
	...simpleImportSort,
	// storybook,
	// ...editorconfig,
	...i18nConfig,
	...i18nextConfig,
	...formatJs,
	...i18nText,
	...es,
	...toml,

	...codeOverride,
	...chaiFriendly,
	...testOverride, // has to be after `fp`
	...noOnlyTests,

	...markdownConfig,

	...jsoncConfig,
	...jsonConfig, // has to be after `jsonc`	toml,
	...yamlConfig,

	...turboConfig,

	...prettierConfig,

	...voltisoOverride,

	// /** `js` (no `ts`) */
	// {
	// 	files: ['*.js', '*.jsx', '*.cjs', '*.cjsx', '*.mjs', '*.mjsx'],
	// },

	/** `ts` (no `js`) */
	{
		files: [
			'**/*.ts',
			'**/*.tsx',
			'**/*.cts',
			'**/*.ctsx',
			'**/*.mts',
			'**/*.mtsx',
		],

		rules: {
			'jsdoc/require-param-type': 0,
			'jsdoc/require-returns-type': 0,

			'editorconfig/indent': 0, // does not work with type args
			'no-use-before-define': 0, // types can be used before define

			'jsdoc/check-param-names': 0,
		},
	},

	/** Js (ESM) */
	{
		files: ['**/*.js', '**/*.jsx', '**/*.mjs', '**/*.mjsx'],

		rules: {
			'@voltiso/file-extension-in-import': ['error', 'always'],
		},
	},

	// `cjs` (js/ts)
	{
		files: [
			'**/*.cjs',
			'**/*.cjsx',
			'**/*.cts',
			'**/*.ctsx',
			'**/next.config.js', // has to be `.js` for `@next/bundle-analyzer` to work :(
		],

		languageOptions: {
			parserOptions: {
				sourceType: 'script',
			},
		},

		rules: {
			'@typescript-eslint/no-var-requires': 0,
			'@typescript-eslint/no-require-imports': 0,
			'import/no-commonjs': 0,
			'unicorn/prefer-module': 0,
		},
	},

	// `cjs` (js-only)
	{
		files: [
			'**/*.cjs',
			'**/*.cjsx',
			'**/next.config.js', // has to be `.js` for `@next/bundle-analyzer` to work :(
		],

		rules: {
			strict: ['warn', 'global'],
		},
	},

	// `jsx`/`tsx`
	{
		files: [
			'**/*.tsx',
			'**/*.jsx',
			'**/*.mtsx',
			'**/*.ctsx',
			'**/*.mjsx',
			'**/*.cjsx',
		],

		rules: {
			'import/no-nodejs-modules': 1,
		},
	},

	...additionalMarkdownOverrides,
).flat()
// .slice(0,1345)
