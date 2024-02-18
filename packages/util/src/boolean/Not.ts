// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Falsy } from './truthy-falsy'

// export type Not_B<A extends boolean, T = true, F = false> = A extends true
// 	? F
// 	: T

//

export type Not<A, True = true, False = false> = A extends Falsy ? True : False
