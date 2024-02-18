// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
// @ts-expect-error no typings
import jest from 'eslint-plugin-jest'
// @ts-expect-error no typings
import jestAsync from 'eslint-plugin-jest-async'
// @ts-expect-error no typings
import jestDom from 'eslint-plugin-jest-dom'
// @ts-expect-error no typings
import jestFormatting from 'eslint-plugin-jest-formatting'
import globals from 'globals'

import { testFiles } from '~/detail/files'

// console.log('asd', jest.configs.all)

// const jestConfigAll = { ...jest.configs.all }
// delete jestConfigAll.env
// jestConfigAll.languageOptions ||= {}
// jestConfigAll.languageOptions.globals = {
// 	...jestConfigAll.languageOptions.globals,
// 	...jest.environments.globals.globals,
// }

// const common = {
// 	files: testFiles,
// }

// const baseConfigs = [
// 	...eslintFlatConfigFromConfig(jestConfigAll, { jest }),

// 	...eslintFlatConfigFromConfig(jestDom.configs.recommended, {
// 		'jest-dom': jestDom,
// 	}),

// 	...eslintFlatConfigFromConfig(jestFormatting.configs.strict, {
// 		'jest-formatting': jestFormatting,
// 	}),
// ].map(config => ({
// 	...config,
// 	...common,
// }))

export const testOverride = defineEslintFlatConfig(
	// ...baseConfigs,
	{
		files: testFiles,

		// env: {
		// 	jest: true,
		// },

		languageOptions: {
			globals: {
				...globals.jest,
			},
		},

		// extends: [
		// 	/** React - CRA */
		// 	// 'react-app/jest',

		// 	'plugin:jest/all',
		// 	'plugin:jest-dom/recommended', // seems to have all rules enabled?
		// 	'plugin:jest-formatting/strict',
		// ],

		plugins: {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
			jest,
			'jest-async': jestAsync as never,
			'jest-dom': jestDom as never,
			'jest-formatting': jestFormatting as never,
		},

		rules: {
			...getAllRules(jest as never, 'jest', 'warn'),
			...getAllRules(jestDom as never, 'jest-dom', 'warn'),
			...getAllRules(jestFormatting as never, 'jest-formatting', 'warn'),
			...getAllRules(jestAsync as never, 'jest-async', 'warn'),

			'jest-async/expect-return': 2,

			'etc/no-deprecated': 0,
			'security/detect-non-literal-fs-filename': 0,
			'jest/prefer-lowercase-title': 0,
			// 'fp/no-unused-expression': 0,
			'new-cap': 0,
			'max-lines-per-function': 0,
			'max-statements': 0,
			'no-magic-numbers': 0,
			'@typescript-eslint/no-explicit-any': 0,
			'etc/prefer-interface': 0,
			'etc/no-misused-generics': 0,
			// 'id-length': 0,
			'no-empty-function': 0,
			'@typescript-eslint/no-empty-function': 0,
			'@typescript-eslint/ban-types': 0,
			'max-classes-per-file': 0,
			'sonarjs/no-identical-functions': 0,
			'unicorn/consistent-function-scoping': 0,
			'unicorn/numeric-separators-style': 0,
			'prefer-arrow-callback': 0,
			'security/detect-object-injection': 0,
			'unicorn/no-null': 0,
			'@typescript-eslint/no-unused-expressions': 0,
			'chai-friendly/no-unused-expressions': 0,
			'class-methods-use-this': 0,
			'no-constructor-return': 0,
			'@typescript-eslint/require-await': 0,
			'@typescript-eslint/no-non-null-assertion': 0,
			'jest/no-conditional-in-test': 0,
			'jsx-a11y/anchor-has-content': 0,
			'react/display-name': 0,
			'formatjs/no-literal-string-in-jsx': 0,
			'no-plusplus': 0,
			'i18next/no-literal-string': 0,
			'react-native/no-inline-styles': 0,
			'github/unescaped-html-literal': 0,
			'func-names': 0,
			'func-style': 0,
			'promise/avoid-new': 0,
			'no-promise-executor-return': 0,
			'jest/max-expects': 0, //! TODO: enable?
			'no-await-in-loop': 0,
			'sonarjs/no-duplicate-string': 0,
			'unicorn/no-await-expression-member': 0,
			'n/no-unpublished-import': 0,
			'no-void': 0,
			'jest/expect-expect': 0, // ! finally
			'jest/no-commented-out-tests': 1,
			'import/no-unassigned-import': 0,
			'no-restricted-imports': 0, // allow '../*' imports
			'no-invalid-this': 0,
			'@typescript-eslint/no-invalid-this': 0,
			'no-useless-constructor': 0,
			'n/no-extraneous-import': 0,
			'require-atomic-updates': 0,

			// allow `any`
			'@typescript-eslint/no-unsafe-assignment': 0,
			'@typescript-eslint/no-unsafe-member-access': 0,

			'jest-formatting/padding-around-after-all-blocks': 2,
			'jest-formatting/padding-around-after-each-blocks': 2,
			'jest-formatting/padding-around-before-all-blocks': 2,
			'jest-formatting/padding-around-before-each-blocks': 2,
			'jest-formatting/padding-around-describe-blocks': 2,
			'jest-formatting/padding-around-test-blocks': 2,

			// change 'error' to 'warn'
			'jest-formatting/padding-around-all': 1,
			'jest/prefer-to-be': 1,
			'jest/require-hook': 1,

			/** Hmm... quite verbose! and often we have type-only tests */
			'jest/prefer-expect-assertions': 0,

			'react/jsx-no-useless-fragment': 0,
			'react/button-has-type': 0,
			'react/jsx-no-bind': 0,

			'rxjs/no-ignored-subscription': 0,
			'rxjs/no-ignored-error': 0,
			'rxjs/finnish': 0,
			'rxjs/suffix-subjects': 0,

			// 'jest/valid-expect': ['error', { maxArgs: 2 }], // @alex_neo/jest-expect-message

			// 'jsdoc/require-example': 0,
			// 'jsdoc/require-param': 0,
			// 'jsdoc/require-returns': 0,
		},
	},
)
