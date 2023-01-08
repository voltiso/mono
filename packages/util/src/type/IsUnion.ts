// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type IsUnionImpl<
	T,
	True = true,
	False = false,
	U extends T = T,
> = T extends any ? ([U] extends [T] ? False : True) : False

export type IsUnion<T, True = true, False = false> = IsUnionImpl<T, True, False>
