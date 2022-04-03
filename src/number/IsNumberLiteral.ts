export type IsNumberLiteral<X, T = true, F = false> = [X] extends [never]
	? F
	: X extends number
	? number extends X
		? F
		: T
	: F
