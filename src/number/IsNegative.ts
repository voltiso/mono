export type IsNegative<X, T = true, F = false> = [X] extends [never]
	? F
	: number extends X
	? boolean
	: X extends number
	? `${X}` extends `-${number}`
		? T
		: F
	: F
