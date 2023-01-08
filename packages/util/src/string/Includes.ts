// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type Includes<
	Str extends string,
	Substr extends string,
	T = true,
	F = false,
> = string extends Str
	? boolean
	: string extends Substr
	? boolean
	: Str extends `${string}${Substr}${string}`
	? T
	: F
