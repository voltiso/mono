export type IsInteger<X, T = true, F = false> = [X] extends [never]
	? F
	: number extends X
	? boolean
	: X extends number
	? `${X}` extends `${string},${string}`
		? F
		: `${X}` extends `${string}.${string}`
		? F
		: T
	: F

export function isInteger<X>(x: X): x is X & IsInteger<X, number, unknown> {
	return Number.isInteger(x)
}
