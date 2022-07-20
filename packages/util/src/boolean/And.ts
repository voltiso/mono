// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IsTruthy } from './truthy-falsy.js'

export type And_B<
	A extends boolean,
	B extends boolean,
	T = true,
	F = false,
> = A extends true ? (B extends true ? T : F) : F
export type And<A, B, T = true, F = false> = And_B<
	IsTruthy<A>,
	IsTruthy<B>,
	T,
	F
>
