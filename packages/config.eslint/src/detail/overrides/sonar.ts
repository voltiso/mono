// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintFlatConfig, getAllRules } from '@voltiso/config.eslint.lib'
import sonarjs from 'eslint-plugin-sonarjs'

import { codeFiles } from '../files'

export const sonar = defineEslintFlatConfig({
	files: codeFiles,

	// extends: ['plugin:sonarjs/recommended'],
	plugins: { sonarjs: sonarjs as never }, // !

	rules: {
		...getAllRules(sonarjs, 'sonarjs', 'warn'),

		'sonarjs/deprecation': 0, // ! slow + already handled by faster `import/no-deprecated`
		'sonarjs/aws-restricted-ip-admin-access': 0, // ! slow + we don't use AWS

		// even if we use `exactOptionalPropertyTypes === false`, no reason not to write portable code
		'sonarjs/no-redundant-optional': 0,

		// not perfect - sometimes it's nice to have a single return statement - then we're able to add stuff fast, e.g. `console.log`
		'sonarjs/arrow-function-convention': 0,

		'sonarjs/no-unused-vars': 0, // typescript does this already; also, ts allows names starting with `_...`

		'sonarjs/no-empty-function': 0, // does not work with eslint 9
		'sonarjs/no-unused-expressions': 0, // does not work with eslint 9
		'sonarjs/no-inconsistent-returns': 0, // does not work with eslint 9
		'sonarjs/no-reference-error': 0, // does not work with eslint 9

		'sonarjs/different-types-comparison': 0, // not always works correctly
		'sonarjs/no-useless-intersection': 0, // not always useless

		'sonarjs/no-empty-test-file': 0, // detects other files as test files in styler.test.native/
		'sonarjs/max-union-size': 0,
		'sonarjs/no-empty-interface': 0, // ! dangerous, changes empty interfaces to types, results in different editor tooltips
		'sonarjs/semi': 0,
		'sonarjs/no-tab': 0,
		'sonarjs/enforce-trailing-comma': 0,
		'sonarjs/file-header': 0,
		'sonarjs/sonar-no-magic-numbers': 0,
		'sonarjs/declarations-in-global-scope': 0,
		'sonarjs/no-wildcard-import': 0,
		'sonarjs/class-name': 0,
		'sonarjs/function-name': 0,
		'sonarjs/prefer-function-type': 0,
		'sonarjs/no-redeclare': 0,
		'sonarjs/sonar-no-unused-vars': 0,
		'sonarjs/file-name-differ-from-class': 0,
		'sonarjs/shorthand-property-grouping': 0,
		'sonarjs/todo-tag': 0,
		'sonarjs/conditional-indentation': 0, // conflicts with prettier
		'sonarjs/no-extra-semi': 0, // conflicts with prettier

		'sonarjs/no-require-or-define': 0,

		'sonarjs/cognitive-complexity': 0, // hmm, may be useful
		'sonarjs/elseif-without-else': 0,
		'sonarjs/prefer-single-boolean-return': 0,
		'sonarjs/no-collapsible-if': 0, // unicorn has auto-fix for this!!

		/**
		 * Nope - variable name can serve as comment, and it's easier to add
		 * console.log for debugging
		 */
		'sonarjs/prefer-immediate-return': 0,

		'sonarjs/no-identical-expressions': 1,
		'sonarjs/no-inverted-boolean-check': 1,
		'sonarjs/no-all-duplicated-branches': 1,
		'sonarjs/no-duplicate-string': 1,
		'sonarjs/no-unused-collection': 1,
	},
})
