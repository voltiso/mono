// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type IsNegative<X, T = true, F = false> = [X] extends [never]
	? F
	: number extends X
	? boolean
	: X extends number
	? `${X}` extends `-${number}`
		? T
		: F
	: F
