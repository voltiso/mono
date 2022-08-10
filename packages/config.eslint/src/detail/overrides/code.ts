// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	defineEslintConfigOverrideRules,
} from '@voltiso/config.eslint.lib'

import { codeFilesNoMd } from '~/detail/files'

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

/** All TS/JS files */
export const codeOverride = defineEslintConfigOverride({
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
	],

	// files: codeFiles,
	...codeFilesNoMd,

	parser: '@typescript-eslint/parser',

	plugins: ['@typescript-eslint'],

	rules: {
		...alreadyHandledByPrettier,
		...alreadyHandledByTsc,
		...alreadyHandledByUnicorn,
		...functionalRecommendedRules,

		'@typescript-eslint/no-floating-promises': 2,
		'@typescript-eslint/no-unnecessary-condition': 1, // sometimes buggy with generics?
		'@typescript-eslint/consistent-type-imports': 1,
		'@typescript-eslint/no-extra-parens': 0, // conflicts with prettier
		'@typescript-eslint/no-extra-semi': 0, // conflicts with prettier
		'@typescript-eslint/no-invalid-this': 0,
		'@typescript-eslint/no-empty-interface': [1, { allowSingleExtends: true }],
		'@typescript-eslint/padding-line-between-statements': 1,
		'@typescript-eslint/no-unsafe-assignment': 1,
		'@typescript-eslint/no-unsafe-member-access': 1,
		'@typescript-eslint/no-unsafe-return': 1,
		'@typescript-eslint/restrict-template-expressions': 1,

		// '@typescript-eslint/no-explicit-any': [
		// 	'error',
		// 	{ ignoreRestArgs: true, fixToUnknown: true },
		// ],

		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/array-type': ['warn', { default: 'array' }],

		'arrow-body-style': 1,
		'func-style': ['warn', 'declaration', { allowArrowFunctions: true }],
		'id-length': 0,

		'@typescript-eslint/lines-between-class-members': [
			'error',
			'always',
			{ exceptAfterSingleLine: true },
		],

		'no-console': 1,
		'no-else-return': 0,
		'no-magic-numbers': ['warn', { ignore: [-2, -1, 0, 1, 2] }],
		'no-plusplus': ['warn', { allowForLoopAfterthoughts: true }],
		'no-shadow': 0, // we like to shadow
		'no-ternary': 0, // ternary... hmm, ok.
		'no-underscore-dangle': 0,
		'no-use-before-define': 2,
		'no-void': ['error', { allowAsStatement: true }],
		'prefer-arrow-callback': 1,
		'sort-imports': 0, // using `simple-import-sort/imports` instead (auto-fixable)

		'sort-keys': 0, // using `sort-keys-fix` instead (auto-fixable)

		'spaced-comment': ['warn', 'always', { markers: ['!', '?'] }], //? allows this

		'one-var': 0,
		'@typescript-eslint/no-shadow': 0,

		// '@typescript-eslint/no-redeclare': [
		// 	'error',
		// 	{ ignoreDeclarationMerge: true },
		// ],

		'@typescript-eslint/no-redeclare': 0,

		'@typescript-eslint/ban-types': [
			'error',
			{
				types: {
					'{}': false,
				},
			},
		],

		'unused-imports/no-unused-vars': 0, // already checked by `tsc` - plus can ignore by prefixing with `_`

		'init-declarations': 0,
		'nonblock-statement-body-position': 0,

		'max-statements': 0,
		// 'max-statements': ['warn', { max: 30 }],

		'no-empty': ['error', { allowEmptyCatch: true }],
		'arrow-parens': 0, // conflicts with prettier
		'@typescript-eslint/space-before-function-paren': 0, // conflicts with prettier
		'no-mixed-spaces-and-tabs': 0, // prettier sometimes does it for alignment - this rule does not account for alignment
		'function-paren-newline': 0, // conflicts with prettier
		'implicit-arrow-linebreak': 0, // conflicts with prettier
		'no-duplicate-imports': 0, // handled by `import/no-duplicates`
		'operator-linebreak': 0,
		'no-multiple-empty-lines': 0, // handled by prettier
		'no-param-reassign': 1,
		'func-names': 0,
		'no-implicit-coercion': 1,
		camelcase: 1,
		'object-shorthand': 1,
		'no-useless-constructor': 1,

		'consistent-return': 1,
		// 'consistent-return': 0, // a bit pain to return `undefined` explicitly in branches?
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

		'padding-line-between-statements': [
			'warn',
			{
				blankLine: 'always',
				prev: 'function',
				next: 'function',
			},
		],

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
} as const)
