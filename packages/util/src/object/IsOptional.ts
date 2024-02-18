// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

// type IsOptional<T, k extends keyof T, TT = true, FF = false> = {} extends { [kk in k]: T[kk] } ? TT : FF

/** Check if `Obj[k]` is optional */
export type IsOptional<
	Obj,
	K extends keyof Obj,
	True = true,
	False = false,
> = Obj extends {
	[k in K]-?: Obj[k]
}
	? False
	: True

// ! problematic - see `exactOptionalPropertyTypes` test
// /**
//  * Check if `T[k]` is optional
//  *
//  * - ⚠️ Prefer {@link IsOptional} - should be faster
//  */
// export type IsOptional_<T, K, True = true, False = false> = K extends $Keyof<T>
// 	? IsOptional<T, K, True, False>
// 	: never
