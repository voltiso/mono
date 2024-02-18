// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Has index signature? */
export type HasIndexSignature<X, T = true, F = false> = string extends keyof X
	? T
	: number extends keyof X
		? T
		: symbol extends keyof X
			? T
			: F

export type HasSymbolIndexSignature<
	O,
	T = true,
	F = false,
> = symbol extends keyof O ? T : F

export type HasStringIndexSignature<
	O,
	T = true,
	F = false,
> = string extends keyof O ? T : F

export type HasNumberIndexSignature<O, T = true, F = false> = {
	0: unknown
} extends { [k in keyof O as number extends k ? k : never]: never }
	? F
	: T
