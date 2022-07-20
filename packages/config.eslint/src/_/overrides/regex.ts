// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	defineEslintConfigOverride,
	defineEslintConfigOverrideRules,
} from '@voltiso/config.eslint.lib'

const regexRules = defineEslintConfigOverrideRules({
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
})

/** `eslint-plugin-regex` - custom eslint rules - can use instead of notice/notice, etc. */
export const regexOverride = defineEslintConfigOverride({
	files: '*',

	plugins: ['regex'],

	rules: regexRules,
})
