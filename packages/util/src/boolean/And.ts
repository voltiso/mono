// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Falsy } from './truthy-falsy'

// export type And_B<
// 	A extends boolean,
// 	B extends boolean,
// 	T = true,
// 	F = false,
// > = A extends true ? (B extends true ? T : F) : F

//

export type And<A, B> = A extends Falsy ? A : B
