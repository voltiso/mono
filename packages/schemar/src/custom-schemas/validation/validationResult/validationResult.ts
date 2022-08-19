// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast1 } from '@voltiso/util'

//! ts-transform-paths does not work for '~'
// eslint-disable-next-line no-restricted-imports
import type { Schemable_ } from '../../..'
import type { ValidationIssue } from '../..'
import { array, tuple, union, unknown, validationIssue } from '../..'

export function validationResult<Value extends Schemable_>(value: Value) {
	return union(
		{
			isValid: true,
			// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
			value: value as Value, //! TS bug?
			issues: tuple(),
		} as const,
		{
			isValid: false,
			value: unknown,
			issues: array(validationIssue).minLength(1),
		} as const,
	)
}

export type ValidationResult<V = unknown> =
	| {
			readonly isValid: true
			readonly value: V
			readonly issues: []
	  }
	| {
			readonly isValid: false
			readonly value: unknown
			readonly issues: AtLeast1<ValidationIssue>
	  }
