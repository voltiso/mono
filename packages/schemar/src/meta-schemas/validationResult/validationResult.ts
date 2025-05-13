// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type {
	CustomArray,
	MutableTuple$,
	Union$,
	Unknown$,
} from '~/base-schemas'
import { array, or, tuple, unknown } from '~/base-schemas'
import type { Schema } from '~/types/Schema/ISchema'
import type { $$Schemable } from '~/types/Schemable/Schemable'

import type { ValidationIssue } from '../validationIssue'
import { validationIssue } from '../validationIssue/validationIssueSchema'

export type __hack_validationResult =
	| Union$<[]>
	| MutableTuple$<[]>
	| Unknown$
	| CustomArray<{}>

export function validationResult<Value extends $$Schemable>(
	value: Value,
): Union$<
	[
		{
			isValid: true
			value: Value
			issues: MutableTuple$<[]>
		},
		{
			isValid: false
			value: Unknown$
			issues: Schema<ValidationIssue[]>
		},
	]
> {
	return or(
		{
			isValid: true,
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			value: value as Value, // ! TS bug?
			issues: tuple(),
		},
		{
			isValid: false,
			value: unknown,
			issues: array(validationIssue).minLength(1) as never, // TODO
		},
	) as never // TODO
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
