// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

type Parity_<L, _0, _1, accumulator extends _0 | _1> = L extends readonly [
	unknown,
	...infer T,
]
	? Parity_<T, _0, _1, accumulator extends _0 ? _1 : _0>
	: L extends readonly []
		? accumulator
		: L extends readonly unknown[]
			? _0 | _1
			: never

export type Parity<L extends readonly unknown[], _0 = 0, _1 = 1> = Parity_<
	L,
	_0,
	_1,
	_0
>
