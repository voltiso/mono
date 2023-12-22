// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { ValidationIssue } from '~'

import { SchemarError } from './SchemarError'
import { ValidationError } from './ValidationError'

const name = 'InvalidFixError'

export class InvalidFixError extends lazyConstructor(() => SchemarError) {
	declare cause: ValidationError

	constructor(issues: ValidationIssue[]) {
		// super(`${issues.map(issue => issue.toString()).join('\n')}`)
		super(
			'Custom fix function returned data not passing validation. See `.cause` for the ValidationError and issues list.',
		)
		// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
		if (Error.captureStackTrace) Error.captureStackTrace(this, this.constructor)
		this.name = name

		this.cause = new ValidationError(issues)
	}
}

export function isInvalidFixError(x: unknown): x is InvalidFixError {
	return (x as InvalidFixError | null)?.name === name
}
