// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import js from '@eslint/js'
import stylistic from '@stylistic/eslint-plugin'
import typescriptPlugin from '@typescript-eslint/eslint-plugin'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore no types
import typescriptParser from '@typescript-eslint/parser'
import {
	defineEslintConfigOverrideRules,
	defineEslintFlatConfig,
	getAllRules,
} from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import { getJsdocProcessorPlugin } from 'eslint-plugin-jsdoc/getJsdocProcessorPlugin.js'
import globals from 'globals'

import { codeFilesNoMd } from '../files.js'

const alreadyHandledByPrettier = defineEslintConfigOverrideRules({
	'@typescript-eslint/comma-dangle': 0,
	'@typescript-eslint/object-curly-spacing': 0,
	'@typescript-eslint/semi': 0,
	'quote-props': 0,
	'object-curly-spacing': 0,
	semi: 0,
} as const)

const alreadyHandledByTsc = defineEslintConfigOverrideRules({
	/** Already checked by TSC, can ignore with `_name` underscored variable name */
	'@typescript-eslint/no-unused-vars': 0,
} as const)

const alreadyHandledByUnicorn = defineEslintConfigOverrideRules({
	/** Handled by `unicorn/prefer-module` */
	'@typescript-eslint/no-var-requires': 0,
} as const)

const functionalRecommendedRules = defineEslintConfigOverrideRules({
	'@typescript-eslint/prefer-readonly': 1,

	// '@typescript-eslint/prefer-readonly-parameter-types': [
	// 	'error',
	// 	{ checkParameterProperties: false },
	// ],

	'@typescript-eslint/prefer-readonly-parameter-types': 0,

	'@typescript-eslint/switch-exhaustiveness-check': 1,
	'no-var': 2,
	'prefer-const': 1,
} as const)

// console.log('??', typescriptPlugin.configs['recommended'])

/** All TS/JS files */
export const codeOverride = defineEslintFlatConfig(
	{
		// files: codeFiles,
		...codeFilesNoMd,

		plugins: {
			'@typescript-eslint': typescriptPlugin as never,
			'@stylistic': stylistic as never,

			// ! does not work with typescript for MD files - tsconfig.json cannot include things inside *.md
			// eslint-disable-next-line @typescript-eslint/no-unsafe-call
			examples: getJsdocProcessorPlugin({
				// Enable these options if you want the `someDefault` inside of the
				//   following to be checked in addition to `@example`:
				//     1. `@default someDefault`
				//     2. `@param [val=someDefault]`,
				//     3. `@property [val=someDefault]`
				checkDefaults: true,
				checkParams: true,
				checkProperties: true,
			}) as never,
		},

		processor: 'examples/examples',

		languageOptions: {
			globals: {
				...globals.browser,
				// ...globals.es2021,
				...globals.node,
			},

			sourceType: 'module',

			parser: typescriptParser as never,

			parserOptions: {
				// ecmaVersion: 3, // oldest possible
				// ecmaVersion: 2021, // 2022-08-11 - no `Object.ownKeys` (ES2022) in Safari
				ecmaVersion: 'latest',

				ecmaFeatures: {
					jsx: true,
				},

				// for @typescript/eslint-parser
				jsxPragma: null,

				// ! you may want to override this
				project: [
					'tsconfig.json',
					'packages/*/tsconfig.json',
					'apps/*/tsconfig.json',
				],

				// project: tsconfigPath, //! you may want to override this
				// tsconfigRootDir: __dirname, //! you may want to override this
			},
		},

		// ! for `n/no-extraneous-import` - but did not work
		// settings: {
		// 	convertPath: {
		// 		'**/~/**/*': ['^.*/~/(.+)$', '$1'],
		// 	},
		// },

		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		rules: {
			...js.configs.all.rules,

			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-non-null-assertion
			...typescriptPlugin.configs['all']!.rules,

			...alreadyHandledByPrettier,
			...alreadyHandledByTsc,
			...alreadyHandledByUnicorn,
			...functionalRecommendedRules,

			...getAllRules(stylistic, '@stylistic', 'warn'),

			// '@stylistic/quotes': ['warn', 'single', { avoidEscape: true }], // ! avoidEscape does not actually work
			'@stylistic/quotes': 0,

			'@stylistic/jsx-newline': 0,

			'@stylistic/quote-props': [
				'warn',
				'as-needed',
				{
					keywords: false, // nice, but not supported by prettier
				},
			],

			'@stylistic/multiline-comment-style': 0,
			'@stylistic/no-tabs': 0,

			'@stylistic/indent': 0, // ['warn', 'tab'], // does not work in all cases
			'@stylistic/indent-binary-ops': 0, // ['warn', 'tab'], // does not work in all cases

			'@stylistic/object-curly-spacing': ['warn', 'always'],
			'@stylistic/array-element-newline': ['warn', 'consistent'],

			'@stylistic/semi': 0, // does not always work with JSX
			// '@stylistic/semi': ['warn', 'never'],

			'@stylistic/comma-dangle': 0, // conflicts with prettier (rarely, but still)
			// '@stylistic/comma-dangle': ['warn', 'always-multiline'],

			'@stylistic/jsx-child-element-spacing': 0, // conflicts with prettier

			// '@stylistic/max-len': ['warn', { code: 80, comments: 120 }],
			'@stylistic/max-len': 0,
			'@stylistic/function-call-argument-newline': ['warn', 'consistent'],
			'@stylistic/arrow-parens': ['warn', 'as-needed'],
			'@stylistic/line-comment-position': 0,
			'@stylistic/array-bracket-newline': ['warn', 'consistent'],
			'@stylistic/no-extra-parens': ['warn', 'functions'],
			'@stylistic/generator-star-spacing': ['warn', 'after'],
			'@stylistic/newline-per-chained-call': 0, // nice, but not compatible with prettier
			'@stylistic/type-generic-spacing': 0,
			'@stylistic/operator-linebreak': 0, // conflicts with prettier
			'@stylistic/no-confusing-arrow': 0, // conflicts with prettier
			'@stylistic/wrap-regex': 0, // conflicts with prettier
			'@stylistic/semi-style': 0, // conflicts with prettier
			'@stylistic/jsx-one-expression-per-line': 0, // conflicts with prettier
			'@stylistic/no-mixed-operators': 0, // TODO: find settings compatible with prettier
			'@stylistic/jsx-indent': ['warn', 'tab'],
			'@stylistic/jsx-indent-props': ['warn', 'tab'],
			'@stylistic/jsx-quotes': ['warn', 'prefer-single'],
			'@stylistic/jsx-max-props-per-line': 0, // conflicts with prettier
			'@stylistic/no-extra-semi': 0, // conflicts with prettier
			'@stylistic/jsx-sort-props': 0,
			'sonarjs/brace-style': 0, // conflicts with prettier
			'@stylistic/brace-style': 0, // conflicts with prettier

			// '@stylistic/function-paren-newline': ['warn', 'consistent'],
			// '@stylistic/function-paren-newline': ['warn', 'multiline-arguments'],
			'@stylistic/function-paren-newline': 0, // no option is consistent with prettier

			'@stylistic/padded-blocks': ['warn', 'never'],

			'@stylistic/space-before-function-paren': 0, // sometimes prettier does it differently
			// '@stylistic/space-before-function-paren': ['warn', 'never'],

			'@stylistic/nonblock-statement-body-position': 0,
			'@stylistic/multiline-ternary': 0,
			'@stylistic/dot-location': 0,
			'@stylistic/no-mixed-spaces-and-tabs': ['warn', 'smart-tabs'],
			'@stylistic/implicit-arrow-linebreak': 0,

			'@stylistic/member-delimiter-style': [
				'warn',
				{
					multiline: {
						delimiter: 'none',
					},
				},
			],

			'@stylistic/lines-around-comment': 0, // conflicts with prettier with JSX and function arguments
			// '@stylistic/lines-around-comment': [
			// 	'warn',
			// 	{
			// 		beforeBlockComment: true,
			// 		// afterBlockComment: true,

			// 		// beforeLineComment: true,
			// 		// afterLineComment: true,

			// 		afterHashbangComment: true,

			// 		allowBlockStart: true,
			// 		// allowBlockEnd: true,
			// 		allowObjectStart: true,
			// 		// allowObjectEnd: true,
			// 		allowArrayStart: true,
			// 		// allowArrayEnd: true,
			// 		allowClassStart: true,
			// 		// allowClassEnd: true,

			// 		allowEnumStart: true,
			// 		// allowEnumEnd: true,
			// 		allowInterfaceStart: true,
			// 		// allowInterfaceEnd: true,
			// 		allowModuleStart: true,
			// 		// allowModuleEnd: true,
			// 		allowTypeStart: true,
			// 		// allowTypeEnd: true,
			// 	},
			// ],

			'@stylistic/object-property-newline': [
				'warn',
				{ allowAllPropertiesOnSameLine: true },
			],

			'@stylistic/padding-line-between-statements': [
				'warn',
				{
					blankLine: 'always',
					prev: 'function',
					next: 'function',
				},
			],

			'lines-between-class-members': 0,

			'@stylistic/lines-between-class-members': [
				'warn',
				'always',
				{ exceptAfterSingleLine: true },
			],

			'@typescript-eslint/no-restricted-types': [
				'warn',
				{
					types: {
						any: true,
					},
				},
			],

			'@typescript-eslint/no-unsafe-type-assertion': 0,

			'@typescript-eslint/no-empty-object-type': 0,
			'@typescript-eslint/no-unsafe-function-type': 1,
			'@typescript-eslint/no-wrapper-object-types': 1,
			'@typescript-eslint/no-duplicate-type-constituents': 0,

			'@typescript-eslint/naming-convention': 0,

			// '@typescript-eslint/naming-convention': [
			// 	'warn',
			// 	{
			// 		selector: 'default',
			// 		format: ['camelCase'],
			// 		leadingUnderscore: 'allow',
			// 		trailingUnderscore: 'allow',
			// 	},

			// 	{
			// 		selector: 'import',
			// 		format: ['camelCase', 'PascalCase'],
			// 	},

			// 	{
			// 		selector: 'variable',
			// 		format: ['camelCase', 'UPPER_CASE'],
			// 		leadingUnderscore: 'allow',
			// 		trailingUnderscore: 'allow',
			// 	},

			// 	{
			// 		selector: 'typeLike',
			// 		format: ['PascalCase'],
			// 		leadingUnderscore: 'allow',
			// 		trailingUnderscore: 'allow',
			// 	},

			// 	{
			// 		selector: 'objectLiteralProperty',
			// 		format: null,
			// 	},
			// ],

			'@typescript-eslint/prefer-destructuring': 0,

			// does not work correctly if function returns either Promise or sync value
			'@typescript-eslint/promise-function-async': 0,
			'@typescript-eslint/no-invalid-void-type': 0,

			// not the same for TS - shorthand is e.g. used for bivariance hack
			'@typescript-eslint/method-signature-style': 0,

			'@typescript-eslint/explicit-member-accessibility': 0,

			// no - we often prefer interfaces to types
			'@typescript-eslint/consistent-indexed-object-style': 0,
			'@typescript-eslint/no-unnecessary-type-arguments': 0,
			'@typescript-eslint/sort-type-constituents': 0,
			'@typescript-eslint/member-ordering': 0,

			// require to init with undefined?
			'@typescript-eslint/init-declarations': 0,

			'@typescript-eslint/prefer-nullish-coalescing': 0,
			'@typescript-eslint/explicit-module-boundary-types': 2, // required for `@voltiso/transform/compat`
			'@typescript-eslint/explicit-function-return-type': 0,
			'@typescript-eslint/max-params': 1,
			'@typescript-eslint/no-unnecessary-type-parameters': 0,

			'@typescript-eslint/strict-boolean-expressions': 0,

			'@typescript-eslint/no-floating-promises': 2,

			// sometimes buggy with generics?
			'@typescript-eslint/no-unnecessary-condition': 1,

			'@typescript-eslint/consistent-type-imports': 1,

			// conflicts with prettier
			'@typescript-eslint/no-extra-parens': 0,

			/** Conflicts with prettier */
			'no-extra-semi': 0,

			/** Conflicts with prettier */
			'@typescript-eslint/no-extra-semi': 0,

			'no-invalid-this': 0,
			'@typescript-eslint/no-invalid-this': 1,

			'@typescript-eslint/no-empty-interface': [
				1,
				{ allowSingleExtends: true },
			],

			// sometimes we prefer interface to type
			'@typescript-eslint/prefer-function-type': 0,

			'no-empty-function': 0,
			'@typescript-eslint/no-empty-function': 1,

			// '@typescript-eslint/no-confusing-void-expression': 0,

			'@typescript-eslint/no-unsafe-assignment': 1,
			'@typescript-eslint/no-unsafe-member-access': 1,
			'@typescript-eslint/no-unsafe-return': 1,
			'@typescript-eslint/no-unsafe-call': 1,
			'@typescript-eslint/restrict-template-expressions': 1,
			'@typescript-eslint/no-unsafe-argument': 1,
			'@typescript-eslint/no-non-null-assertion': 1,
			'@typescript-eslint/no-non-null-asserted-optional-chain': 1,

			// prettier
			'@typescript-eslint/space-before-function-paren': 0,

			'@typescript-eslint/unbound-method': 1,

			// conflicts with AlsoAccept
			'@typescript-eslint/no-redundant-type-constituents': 0,

			'@typescript-eslint/no-unsafe-declaration-merging': 1,

			// '@typescript-eslint/no-explicit-any': [
			// 	'error',
			// 	{ ignoreRestArgs: true, fixToUnknown: true },
			// ],

			'@typescript-eslint/no-explicit-any': 0,
			'@typescript-eslint/array-type': ['warn', { default: 'array' }],

			// useful to sometimes use {} - to have commented-out console.log there
			'arrow-body-style': 0,

			'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
			'id-length': 0,

			//

			//

			'no-warning-comments': 0, // comments, etc.
			'no-inline-comments': 0, // we like to comment inline
			'line-comment-position': 0, // we like to comment inline

			'multiline-comment-style': 0,
			'capitalized-comments': 0,
			'no-bitwise': 1,
			'no-constructor-return': 1,
			'prefer-destructuring': 0, // hmm, buggy for non-local variables
			'no-console': 1,
			'no-else-return': 0,

			'no-magic-numbers': 0,

			'@typescript-eslint/no-magic-numbers': [
				'warn',
				{ ignore: [-3, -2, -1, 0, 1, 2, 3, 1_024] },
			],

			'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
			'no-shadow': 0, // we like to shadow
			'no-ternary': 0, // ternary... hmm, ok.
			'no-underscore-dangle': 0,

			'no-use-before-define': 0,
			'@typescript-eslint/no-use-before-define': 0,

			'no-void': ['error', { allowAsStatement: true }],
			'prefer-arrow-callback': 1,
			'no-confusing-arrow': 0, // not confusing at all
			'generator-star-spacing': 0, // prettier

			'class-methods-use-this': 0,
			'@typescript-eslint/class-methods-use-this': 1,

			'new-cap': 0,
			'sonarjs/new-cap': 0,

			'require-atomic-updates': 1,
			'jsx-quotes': 0,
			'sort-imports': 0, // using `simple-import-sort/imports` instead (auto-fixable)
			complexity: 0,
			'wrap-iife': 0,

			'sort-keys': 0, // using `sort-keys-fix` instead (auto-fixable)

			'spaced-comment': ['warn', 'always', { markers: ['!', '?'] }], // ? allows this

			'one-var': 0,
			'@typescript-eslint/no-shadow': 0,

			// '@typescript-eslint/no-redeclare': [
			// 	'error',
			// 	{ ignoreDeclarationMerge: true },
			// ],

			'@typescript-eslint/no-redeclare': 0,

			'@typescript-eslint/no-namespace': 0, // nice to have type-only namespaces
			// '@typescript-eslint/no-namespace': [
			// 	'warn',
			// 	{ allowDeclarations: true, allowDefinitionFiles: true },
			// ],

			'unused-imports/no-unused-vars': 0, // already checked by `tsc` - plus can ignore by prefixing with `_`

			'init-declarations': 0,
			'nonblock-statement-body-position': 0,

			'max-statements': 0,
			// 'max-statements': ['warn', { max: 30 }],

			'no-empty': ['error', { allowEmptyCatch: true }],
			'no-mixed-spaces-and-tabs': 0, // prettier sometimes does it for alignment - this rule does not account for alignment
			'operator-linebreak': 0,
			'no-param-reassign': 1,
			'func-names': 0,
			'no-implicit-coercion': 0,
			camelcase: 0, // sometimes underscores are useful? or better use type-only namespaces?
			'object-shorthand': 1,
			'no-useless-constructor': 1,
			'no-useless-computed-key': 1,

			'no-duplicate-imports': 0, // handled by `import/no-duplicates`

			'no-undef': 0,

			'no-undefined': 0,

			// 'func-names': [
			// 	'error',
			// 	'always',
			// 	{
			// 		generators: 'never',
			// 	},
			// ], // make unnamed functions arrow

			'prefer-named-capture-group': 0, // handled by `regexp/prefer-named-capture-group`
			'newline-per-chained-call': 0,
			'dot-notation': 0,
			'brace-style': 0,
			'no-negated-condition': 0, // sometimes useful
			'max-classes-per-file': 0,
			'max-lines': 0,
			'max-lines-per-function': 0,
			'max-params': 0,
			'no-continue': 0,
			'default-param-last': 1,
			'max-statements-per-line': 0, // prettier
			'no-useless-rename': 1,
			'prefer-object-has-own': 0, // not available in Safari
			'no-return-await': 1,

			'consistent-return': 0, // @typescript-eslint/consistent-return

			'no-restricted-imports': [
				'warn',
				{
					patterns: [
						{
							group: ['../../*'],

							message:
								'Do not import from `../../*` - use `paths` in `tsconfig.json` instead - e.g. `"~": "./src"`, `"~/*": "./src/*`',
						},
					],
				},
			],
		},
	},
	{
		files: ['scripts.ts'],

		rules: {
			'@typescript-eslint/explicit-module-boundary-types': 0,
		},
	},
)
