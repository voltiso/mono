// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationIssue } from '@voltiso/schemar'
import type { Observable } from 'rxjs'

export type UseFormValidator<T = unknown> = (
	x: T,
) =>
	| ValidationIssue
	| Promise<ValidationIssue>
	| Observable<ValidationIssue>
	| Promise<Observable<ValidationIssue>>

export type UseFormValidators<T> = {
	[k in keyof T]?: UseFormValidator<T[k]> | UseFormValidators<T[k]> | undefined
}
