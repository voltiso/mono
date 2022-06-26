import { IsTruthy } from "./truthy-falsy.js";

export type Xor_B<
	A extends boolean,
	B extends boolean,
	T = true,
	F = false
> = A extends true ? (B extends true ? F : T) : B extends true ? T : F;
export type Xor<A, B, T = true, F = false> = Xor_B<
	IsTruthy<A>,
	IsTruthy<B>,
	T,
	F
>;
