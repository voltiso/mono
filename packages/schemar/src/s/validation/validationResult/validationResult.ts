// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast1 } from '@voltiso/util'

import type { RootSchemable } from '../../../schema'
import * as s from '../..'
import type { ValidationIssue } from '..'
import { validationIssue } from '../validationIssue'

export const validationResult = <Value extends RootSchemable>(value: Value) =>
	s.union(
		{
			isValid: true,
			value,
			issues: s.tuple(),
		} as const,
		{
			isValid: false,
			value: s.unknown,
			issues: s.array(validationIssue).minLength(1),
		} as const,
	)

export type IValidationResult<V = unknown> =
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

export type ValidationResult<V> = IValidationResult<V>
