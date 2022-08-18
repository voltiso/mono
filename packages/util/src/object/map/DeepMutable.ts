// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** @inline */
export type DeepMutable_<T> = {
	-readonly [k in keyof T]: DeepMutable_<T[k]>
}

/** @inline */
export type DeepMutable<T extends object | unknown[]> = DeepMutable_<T>

//

/** @inline */
export type $DeepMutable_<T> = T extends any ? DeepMutable_<T> : never

/** @inline */
export type $DeepMutable<T extends object | unknown[]> = $DeepMutable_<T>
