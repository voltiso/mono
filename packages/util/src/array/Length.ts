// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Increment_ } from '~/type/number'

/** @internal */
export type _LengthRec<Arr, Acc> = Arr extends readonly []
	? Acc
	: Arr extends readonly [unknown, ...infer Tail]
		? _LengthRec<Tail, Increment_<Acc>>
		: never

export type Length_<Arr> = _LengthRec<Arr, 0>

export type Length<Arr extends readonly unknown[]> = Length_<Arr>
