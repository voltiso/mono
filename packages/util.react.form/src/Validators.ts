// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationResult } from '@voltiso/schemar.types'
import type { Observable } from 'rxjs'

export type UseFormValidator<T = unknown> = (
	x: T,
) =>
	| ValidationResult
	| Promise<ValidationResult>
	| Observable<ValidationResult>
	| Promise<Observable<ValidationResult>>

export type UseFormValidators<T> = {
	[k in keyof T]?: UseFormValidator<T[k]> | UseFormValidators<T[k]> | undefined
}
