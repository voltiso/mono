// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Falsy } from './truthy-falsy'

// export type Or_B<
// 	A extends boolean,
// 	B extends boolean,
// 	T = true,
// 	F = false,
// > = A extends false ? (B extends false ? F : T) : T

export type Or<A, B> = A extends Falsy ? B : A

//  Or_B<IsTruthy<A>, IsTruthy<B>, T, F>
