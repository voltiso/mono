export type Head<L extends unknown[]> = L extends [infer H, ...unknown[]] ? H : never
export type Tail<L extends unknown[]> = L extends [unknown, ...infer T] ? T : never

type Not<X extends number> = X extends 0 ? 1 : 0

export type ListParity<L, O = 0, I = 1> = L extends [unknown, ...infer T]
	? Not<ListParity<T>>
	: L extends []
	? O
	: L extends unknown[]
	? O | I
	: never
