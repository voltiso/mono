// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @inline */
export type DeepReadonly_<T> = {
	readonly [k in keyof T]: DeepReadonly_<T[k]>
}

/** @inline */
export type DeepReadonly<T extends object> = DeepReadonly_<T>

//

/** @inline */
export type $DeepReadonly_<T> = T extends any ? DeepReadonly_<T> : never

/** @inline */
export type $DeepReadonly<T extends object> = $DeepReadonly_<T>
