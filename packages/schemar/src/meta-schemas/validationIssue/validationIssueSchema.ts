// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

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

import { validationIssueSeverity } from './sValidationIssueSeverity'
import type { ValidationIssue } from './ValidationIssue'

export const _validationIssue = lazyObject(() => {
	const toStringParameter = infer({
		skipReceived: boolean.or(undefined_).optional,
	})

	const sValidationIssueToString = function_(
		[toStringParameter.optional] as const,
		string,
	)

	return object({
		severity: validationIssueSeverity,

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

export const validationIssue = lazyObject(() =>
	_validationIssue.CastOutput<ValidationIssue>(),
)
