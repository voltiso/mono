// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsTruthy } from './truthy-falsy'

export type Not_B<A extends boolean, T = true, F = false> = A extends true
	? F
	: T
export type Not<A, T = true, F = false> = Not_B<IsTruthy<A>, T, F>
