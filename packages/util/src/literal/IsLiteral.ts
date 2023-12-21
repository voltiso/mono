// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type IsLiteralOfType<X, Type, T = true, F = false> = [X] extends [never]
	? F
	: X extends Type
		? Type extends X
			? F
			: X extends object
				? F
				: T
		: F

export type IsLiteral<X, T = true, F = false> = X extends null | undefined
	? T
	: IsLiteralOfType<X, string> extends true
		? T
		: IsLiteralOfType<X, number> extends true
			? T
			: IsLiteralOfType<X, boolean> extends true
				? T
				: IsLiteralOfType<X, symbol> extends true
					? T
					: IsLiteralOfType<X, bigint> extends true
						? T
						: F
