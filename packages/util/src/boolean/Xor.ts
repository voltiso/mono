// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Falsy } from './truthy-falsy'

// export type Xor_B<
// 	A extends boolean,
// 	B extends boolean,
// 	T = true,
// 	F = false,
// > = A extends true ? (B extends true ? F : T) : B extends true ? T : F

/** Logical XOR */
export type Xor<A, B, True = true, False = false> = A extends Falsy
	? B extends Falsy
		? False
		: True
	: B extends Falsy
	? True
	: False
