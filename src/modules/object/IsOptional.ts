/* eslint-disable @typescript-eslint/no-explicit-any */
// type IsOptional<T, k extends keyof T, TT = true, FF = false> = {} extends { [kk in k]: T[kk] } ? TT : FF

/**
 * Check if `T[k]` is optional
 */
export type IsOptional<
	T extends object,
	K extends keyof T,
	True = true,
	False = false
> = IsOptionalImpl<T, K, True, False>

/**
 * Check if `T[k]` is optional
 */
export type IsOptional_<T, K, True = true, False = false> = IsOptionalImpl<
	T,
	// @ts-expect-error ]:->
	K,
	True,
	False
>

//

export type IsOptionalImpl<
	T,
	K extends keyof T,
	True = true,
	False = false
> = T extends {
	[k in K]-?: T[k]
}
	? False
	: True
