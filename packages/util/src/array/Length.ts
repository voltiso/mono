import type { Increment_ } from '~/type/number'

/** @internal */
export type _LengthImpl<Arr, Acc> = Arr extends readonly []
	? Acc
	: Arr extends readonly [unknown, ...infer Tail]
	? _LengthImpl<Tail, Increment_<Acc>>
	: never

export type Length_<Arr> = _LengthImpl<Arr, 0>

export type Length<Arr extends readonly unknown[]> = Length_<Arr>
