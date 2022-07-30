// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast1 } from '@voltiso/util'

import type { Schemable, ValidationIssue } from '~'
import * as s from '~'

export const validationResult = <Value extends Schemable>(value: Value) =>
	s.union(
		{
			isValid: true,
			value,
			issues: s.tuple(),
		} as const,
		{
			isValid: false,
			value: s.unknown,
			issues: s.array(s.validationIssue).minLength(1),
		} as const,
	)

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
