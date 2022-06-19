import { SchemarError } from './SchemarError'
import * as s from '../s'

export class ValidationError extends SchemarError {
	issues: s.ValidationIssue[]

	constructor(issues: s.ValidationIssue[]) {
		super(`${issues.map(issue => issue.toString()).join('\n')}`)
		Error.captureStackTrace(this, this.constructor)
		this.name = this.constructor.name

		this.issues = issues
	}
}
