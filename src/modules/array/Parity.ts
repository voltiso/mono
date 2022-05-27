/* eslint-disable no-magic-numbers */
type Parity_<L, _0, _1, acc extends _0 | _1> = L extends readonly [
	unknown,
	...infer T
]
	? Parity_<T, _0, _1, acc extends _0 ? _1 : _0>
	: L extends readonly []
	? acc
	: L extends readonly unknown[]
	? _0 | _1
	: never

export type Parity<L extends readonly unknown[], _0 = 0, _1 = 1> = Parity_<
	L,
	_0,
	_1,
	_0
>
