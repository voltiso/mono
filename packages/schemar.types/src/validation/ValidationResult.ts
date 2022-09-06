// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { AtLeast1 } from '@voltiso/util'

import type { ValidationIssue } from './ValidationIssue'

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
