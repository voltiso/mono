// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyObject } from '@voltiso/util'

import { array } from '~/base-schemas/array/Array'
import { boolean } from '~/base-schemas/boolean/boolean'
import { optional } from '~/base-schemas/misc'
import { number } from '~/base-schemas/number/Number'
import { string } from '~/base-schemas/string/String'
import { undefined as undefined_ } from '~/base-schemas/undefined/undefined'
import { or } from '~/base-schemas/union/or'
import { function as function_ } from '~/base-schemas/unknownFunction/unknownFunction'
import { object } from '~/base-schemas/unknownObject/UnknownObject'
import { symbol } from '~/base-schemas/unknownSymbol/symbol'
import { infer } from '~/infer/infer'

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
