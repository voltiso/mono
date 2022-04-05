type Not<X extends number> = X extends 0 ? 1 : 0

export type Parity<L, O = 0, I = 1> = L extends readonly [unknown, ...infer T]
	? Not<Parity<T>>
	: L extends readonly []
	? O
	: L extends readonly unknown[]
	? O | I
	: never
