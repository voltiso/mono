// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { MaybePromise } from '@voltiso/util'

import type * as s from './schemas/index'

export type Validator<T = unknown> = (x: T) => MaybePromise<s.ValidationResult>

export type Validators<T> = {
	[k in keyof T]?: Validator<T[k]>
}
