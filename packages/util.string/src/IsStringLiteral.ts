import type { IsLiteralOfType } from '@voltiso/util.type'

export type IsStringLiteral<X, T = true, F = false> = IsLiteralOfType<
	X,
	string,
	T,
	F
>
