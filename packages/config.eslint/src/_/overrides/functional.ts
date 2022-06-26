// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { codeFiles } from '../files.js'

const noMutationRules = {
	'functional/immutable-data': 0,
	'functional/no-let': 2,
	'functional/no-method-signature': 2,
	'functional/prefer-readonly-type': 2,
}

const noOopRules = {
	'functional/no-class': 2,
	'functional/no-mixed-type': 2,
	'functional/no-this-expression': 2,
}

const noStatementsRules = {
	'functional/no-conditional-statement': 2,
	'functional/no-expression-statement': 0,
	'functional/no-loop-statement': 2,
	'functional/no-return-void': 2,
}

const noExceptionsRules = {
	'functional/no-promise-reject': 2,
	'functional/no-throw-statement': 2,
	'functional/no-try-statement': 2,
}

const curryingRules = {
	'functional/functional-parameters': 2,
}

const stylisticRules = {
	'functional/prefer-tacit': 2,
}

/** `eslint-plugin-functional` - functional programming */
export const functional = {
	extends: [
		'plugin:functional/external-recommended',
		'plugin:functional/recommended',
		'plugin:functional/stylistic',
	],

	files: codeFiles,

	plugins: ['functional'],

	rules: {
		...noMutationRules,
		...noOopRules,
		...noStatementsRules,
		...noExceptionsRules,
		...curryingRules,
		...stylisticRules,
	},
}
