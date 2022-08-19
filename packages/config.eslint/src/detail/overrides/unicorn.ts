// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { defineEslintConfigOverride } from '@voltiso/config.eslint.lib'

import { codeFiles } from '../files'

export const unicorn = defineEslintConfigOverride({
	extends: ['plugin:unicorn/all'],

	files: codeFiles,

	plugins: ['unicorn'],

	rules: {
		'unicorn/import-index': 1, // deprecated but cool

		//
		//
		//
		//
		//

		'unicorn/better-regex': 1,
		'unicorn/catch-error-name': 1,
		'unicorn/consistent-destructuring': 1,
		'unicorn/consistent-function-scoping': 1,
		'unicorn/custom-error-definition': 1,
		'unicorn/empty-brace-spaces': 1,
		'unicorn/error-message': 1,
		'unicorn/escape-case': 1,
		'unicorn/expiring-todo-comments': 1,
		'unicorn/explicit-length-check': 1,

		// 'unicorn/filename-case': [
		// 	1,
		// 	{ cases: { camelCase: true, pascalCase: true } },
		// ],

		'unicorn/filename-case': 0, // does not allow `someName_.ts`

		'unicorn/import-style': 1,
		'unicorn/new-for-builtins': 1,
		'unicorn/no-abusive-eslint-disable': 1,
		'unicorn/no-array-callback-reference': 1,
		'unicorn/no-array-for-each': 1,
		'unicorn/no-array-method-this-argument': 1,
		'unicorn/no-array-push-push': 1,
		'unicorn/no-array-reduce': 1,
		'unicorn/no-await-expression-member': 1,
		'unicorn/no-console-spaces': 1,
		'unicorn/no-document-cookie': 1,
		'unicorn/no-empty-file': 1,
		'unicorn/no-for-loop': 1,
		'unicorn/no-hex-escape': 1,
		'unicorn/no-instanceof-array': 1,
		'unicorn/no-invalid-remove-event-listener': 1,
		'unicorn/no-keyword-prefix': 0,
		'unicorn/no-lonely-if': 1,
		'no-nested-ternary': 'off',
		'unicorn/no-nested-ternary': 0,
		'unicorn/no-new-array': 1,
		'unicorn/no-new-buffer': 1,

		'unicorn/no-null': 0, //

		'unicorn/no-object-as-default-parameter': 1,
		'unicorn/no-process-exit': 1,
		'unicorn/no-static-only-class': 1,
		'unicorn/no-thenable': 1,
		'unicorn/no-this-assignment': 1,
		'unicorn/no-unreadable-array-destructuring': 1,
		'unicorn/no-unreadable-iife': 1,
		'unicorn/no-unsafe-regex': 1,
		'unicorn/no-unused-properties': 1,
		'unicorn/no-useless-fallback-in-spread': 1,
		'unicorn/no-useless-length-check': 1,
		'unicorn/no-useless-promise-resolve-reject': 1,
		'unicorn/no-useless-spread': 1,
		'unicorn/no-useless-switch-case': 1,

		'unicorn/no-useless-undefined': 0, // consistent-return
		// 'unicorn/no-useless-undefined': [1, { checkArguments: false }],

		'unicorn/no-zero-fractions': 1,
		'unicorn/number-literal-case': 1,

		'unicorn/numeric-separators-style': [
			'warn',
			{ number: { minimumDigits: 0, groupLength: 3 } },
		],

		'unicorn/prefer-add-event-listener': 1,
		'unicorn/prefer-array-find': 1,
		'unicorn/prefer-array-flat': 1,
		'unicorn/prefer-array-flat-map': 1,
		'unicorn/prefer-array-index-of': 1,
		'unicorn/prefer-array-some': 1,
		'unicorn/prefer-at': 1,
		'unicorn/prefer-code-point': 1,
		'unicorn/prefer-date-now': 1,
		'unicorn/prefer-default-parameters': 1,
		'unicorn/prefer-dom-node-append': 1,
		'unicorn/prefer-dom-node-dataset': 1,
		'unicorn/prefer-dom-node-remove': 1,
		'unicorn/prefer-dom-node-text-content': 1,
		'unicorn/prefer-event-target': 1,
		'unicorn/prefer-export-from': 1,
		'unicorn/prefer-includes': 1,
		'unicorn/prefer-json-parse-buffer': 1,
		'unicorn/prefer-keyboard-event-key': 1,
		'unicorn/prefer-logical-operator-over-ternary': 1,
		'unicorn/prefer-math-trunc': 1,
		'unicorn/prefer-modern-dom-apis': 1,
		'unicorn/prefer-modern-math-apis': 1,
		'unicorn/prefer-module': 1,
		'unicorn/prefer-native-coercion-functions': 1,
		'unicorn/prefer-negative-index': 1,
		'unicorn/prefer-node-protocol': 1,
		'unicorn/prefer-number-properties': 1,
		'unicorn/prefer-object-from-entries': 1,
		'unicorn/prefer-optional-catch-binding': 1,
		'unicorn/prefer-prototype-methods': 1,
		'unicorn/prefer-query-selector': 1,
		'unicorn/prefer-reflect-apply': 1,
		'unicorn/prefer-regexp-test': 1,
		'unicorn/prefer-set-has': 1,
		'unicorn/prefer-spread': 1,
		'unicorn/prefer-string-replace-all': 1,
		'unicorn/prefer-string-slice': 1,
		'unicorn/prefer-string-starts-ends-with': 1,
		'unicorn/prefer-string-trim-start-end': 1,
		'unicorn/prefer-switch': 1,

		'unicorn/prefer-ternary': 0, //

		'unicorn/prefer-top-level-await': 1,
		'unicorn/prefer-type-error': 1,

		'unicorn/prevent-abbreviations': 0, // awful

		// 'unicorn/prevent-abbreviations': [
		// 	1,
		// 	{
		// 		allowList: {
		// 			arg: true,
		// 			Arg: true,
		// 			args: true,
		// 			Args: true,
		// 			Arr: true,
		// 			obj: true,
		// 			Obj: true,
		// 			str: true,
		// 			Str: true,
		// 			func: true,
		// 			Func: true,
		// 			dir: true,
		// 			dirs: true,
		// 			compatDirs: true,
		// 			props: true,
		// 		},

		// 		replacements: {
		// 			fun: { func: true },
		// 			Fun: { Func: true },
		// 			op: { operation: true, operand: true },
		// 			Op: { Operation: true, Operand: true },
		// 		},
		// 	},
		// ],

		'unicorn/relative-url-style': 1,
		'unicorn/require-array-join-separator': 1,
		'unicorn/require-number-to-fixed-digits-argument': 1,
		'unicorn/require-post-message-target-origin': 1,
		'unicorn/string-content': 1,
		'unicorn/template-indent': 1,
		'unicorn/text-encoding-identifier-case': 1,
		'unicorn/throw-new-error': 1,
	},
} as const)
