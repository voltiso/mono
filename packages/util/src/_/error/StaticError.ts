// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TYPE } from '_/symbols/type'

export interface StaticError {
	[TYPE]: 'StaticError'
}

/**
 * @example
 *
 * ```ts
 * type MyGeneric<T> = T extends string ? ... : Throw<"MyGeneric: T should be string" & {Got: T}>
 * ```
 */
export type Throw<message> = [StaticError & message][0]
