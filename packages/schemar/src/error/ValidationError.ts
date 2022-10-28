// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationIssue } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { SchemarError } from './SchemarError'

const name = 'ValidationError'

export class ValidationError extends lazyConstructor(() => SchemarError) {
	issues: ValidationIssue[]

	constructor(issues: ValidationIssue[]) {
		super(`${issues.map(issue => issue.toString()).join('\n')}`)
		Error.captureStackTrace(this, this.constructor)
		this.name = name

		this.issues = issues
	}
}

export function isValidationError(x: unknown): x is ValidationError {
	return (x as ValidationError | null)?.name === name
}
