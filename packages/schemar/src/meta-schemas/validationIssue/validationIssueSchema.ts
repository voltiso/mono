// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyValue } from '@voltiso/util'

import { infer } from '~'
import {
	array,
	boolean,
	function as function_,
	number,
	object,
	optional,
	or,
	string,
	symbol,
	undefined as undefined_,
} from '~/base-schemas' //! ts-transform-paths does not work here!!! ???

import { schemarSeverity } from '../sSchemarSeverity'
import type { ValidationIssue } from './ValidationIssue'

export const _validationIssue = lazyValue(() => {
	const toStringParameter = infer({
		skipReceived: boolean.or(undefined_).optional,
	})

	const sValidationIssueToString = function_(
		[toStringParameter.optional],
		string,
	)

	return object({
		severity: schemarSeverity,

		path: array(or(string, number, symbol)),
		name: string.optional,

		expected: {
			oneOfValues: array.optional,
			description: string.optional,
		},

		received: {
			value: optional,
			description: string.optional,
		},

		toString: sValidationIssueToString,
	})
})

export const validationIssue = lazyValue(() =>
	_validationIssue.CastOutput<ValidationIssue>(),
)
