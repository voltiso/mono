// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type * as s from '../s'
import { SchemarError } from './SchemarError.js'

export class ValidationError extends SchemarError {
	issues: s.ValidationIssue[]

	constructor(issues: s.ValidationIssue[]) {
		super(`${issues.map(issue => issue.toString()).join('\n')}`)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'ValidationError'

		this.issues = issues
	}
}
