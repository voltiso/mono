import { IsLiteralOfType } from "../misc/IsLiteral.js";

export type IsNumberLiteral<X, T = true, F = false> = IsLiteralOfType<
	X,
	number,
	T,
	F
>;
