// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { ValidationResult } from '@voltiso/schemar'
import type { MaybePromise } from '@voltiso/util'

export type Validator<T = unknown> = (x: T) => MaybePromise<ValidationResult>

export type Validators<T> = {
	[k in keyof T]?: Validator<T[k]>
}
