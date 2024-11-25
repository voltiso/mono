// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { TypeTag } from '~/type'

export interface StaticError {
	[TypeTag]: 'StaticError'
}

/**
 * @example
 *
 * ```ts
 * type MyGeneric<T> = T extends string ? ... : Throw<"MyGeneric: T should be string" & {Got: T}>
 * ```
 */
export type Throw<message> = [StaticError & message][0]
