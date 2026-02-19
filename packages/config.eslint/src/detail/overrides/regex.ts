// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { getAllRules } from '@voltiso/config.eslint.lib'
import { defineConfig } from 'eslint/config'
// @ts-expect-error no typings
import regex from 'eslint-plugin-regex'

/**
 * `eslint-plugin-regex` - custom eslint rules - can use instead of
 * notice/notice, etc.
 */
export const regexConfig = defineConfig({
	// files: '*',

	plugins: {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		regex,
	},

	rules: {
		...getAllRules(regex as never, 'regex', 'warn'),

		'regex/required': 0,
		'regex/use': 0,
		'regex/required-warn': 0,
		'regex/required-error': 0,
		'regex/another-required': 0,
		'regex/other-required': 0,
		'regex/invalid': 0,
		'regex/disuse': 0,
		'regex/avoid': 0,
		'regex/invalid-warn': 0,
		'regex/invalid-error': 0,
		'regex/another-invalid': 0,
		'regex/other-invalid': 0,

		// 'regex/invalid': [
		// 	'error',
		// 	[
		// 		{
		// 			regex: 'invalidRegex1',
		// 			replacement: 'newValue',
		// 		},
		// 		{
		// 			id: 'regexIdN',
		// 			message: 'errorMessageN',
		// 			regex: 'invalidRegexN',
		// 			files: {
		// 				ignore: 'ignoreFilesRegexN',
		// 			},
		// 		},
		// 	],
		// ],

		// 'regex/required': [
		// 	'error',
		// 	[
		// 		{
		// 			id: 'regexId1',
		// 			regex: 'requiredRegex1',
		// 			message: 'errorMessage1',
		// 			files: {
		// 				inspect: 'inspectFilesRegex1',
		// 			},
		// 		},
		// 		{
		// 			regex: 'requiredRegexN',
		// 			files: {
		// 				ignore: 'ignoreFilesRegexA',
		// 				inspect: 'inspectFilesRegexZ',
		// 			},
		// 		},
		// 	],
		// ],
	},
})
