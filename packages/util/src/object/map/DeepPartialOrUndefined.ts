// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @inline */
export type DeepPartialOrUndefined_<T> = [T] extends [readonly unknown[]]
	? T
	: {
			[k in keyof T]?: DeepPartialOrUndefined_<T[k]> | undefined
	  }

/** @inline */
export type DeepPartialOrUndefined<T extends object> =
	DeepPartialOrUndefined_<T>

//

/** @inline */
export type $DeepPartialOrUndefined_<T> = T extends any
	? DeepPartialOrUndefined_<T>
	: never

/** @inline */
export type $DeepPartialOrUndefined<T extends object> =
	$DeepPartialOrUndefined_<T>
