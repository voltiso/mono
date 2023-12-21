// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @inline */
export type DeepNonStrictPartial_<T> = [T] extends [readonly unknown[]]
	? T
	: {
			[k in keyof T]?: DeepNonStrictPartial_<T[k]> | undefined
		}

/** @inline */
export type DeepNonStrictPartial<T extends object> = DeepNonStrictPartial_<T>

//

/** @inline */
export type $DeepNonStrictPartial_<T> = T extends any
	? DeepNonStrictPartial_<T>
	: never

/** @inline */
export type $DeepNonStrictPartial<T extends object> = $DeepNonStrictPartial_<T>
