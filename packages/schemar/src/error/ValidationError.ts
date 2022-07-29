// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type * as s from '~/schemas/index'

import { SchemarError } from './SchemarError'

export class ValidationError extends lazyConstructor(() => SchemarError) {
	issues: s.ValidationIssue[]

	constructor(issues: s.ValidationIssue[]) {
		super(`${issues.map(issue => issue.toString()).join('\n')}`)
		Error.captureStackTrace(this, this.constructor)
		this.name = 'ValidationError'

		this.issues = issues
	}
}
