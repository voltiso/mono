// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as t from '@voltiso/schemar.types'
import { lazyValue } from '@voltiso/util'

import {
	array,
	boolean,
	function as function_,
	infer,
	number,
	object,
	optional,
	or,
	string,
	symbol,
	undefined as undefined_,
} from '../..' //! ts-transform-paths does not work here!!!
import { schemarSeverity } from '../sSchemarSeverity'

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
	_validationIssue.CastOutput<t.ValidationIssue>(),
)
