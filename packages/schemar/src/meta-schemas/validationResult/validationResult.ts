// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { CustomArray, MutableTuple$, Union$, Unknown$ } from '~/base-schemas'
import { array, or, tuple, unknown } from '~/base-schemas'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { ValidationIssue } from '../validationIssue'
import { validationIssue } from '../validationIssue/validationIssueSchema'

// eslint-disable-next-line @typescript-eslint/naming-convention
export type __hack_validationResult =
	| Union$<[]>
	| MutableTuple$<[]>
	| Unknown$
	| CustomArray<{}>

export function validationResult<Value extends $$Schemable>(value: Value) {
	return or(
		{
			isValid: true,
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			value: value as Value, //! TS bug?
			issues: tuple(),
		},
		{
			isValid: false,
			value: unknown,
			issues: array(validationIssue).minLength(1),
		},
	)
}

export type ValidationResult<V = unknown> =
	| {
			readonly isValid: false
			readonly value: unknown
			readonly issues: ValidationIssue[] // AtLeast1<ValidationIssue>
	  }
	| {
			readonly isValid: true
			readonly value: V
			readonly issues: []
	  }
