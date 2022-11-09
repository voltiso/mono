// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// type IsOptional<T, k extends keyof T, TT = true, FF = false> = {} extends { [kk in k]: T[kk] } ? TT : FF

/** Check if `T[k]` is optional */
export type IsOptional<
	T,
	K extends keyof T,
	True = true,
	False = false,
> = T extends {
	[k in K]-?: T[k]
}
	? False
	: True

/**
 * Check if `T[k]` is optional
 *
 * - ⚠️ Prefer {@link IsOptional} - should be faster
 */
export type IsOptional_<T, K, True = true, False = false> = IsOptional<
	T,
	K & keyof T,
	True,
	False
>
