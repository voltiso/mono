// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepReadonly_<T> = {
	readonly [k in keyof T]: DeepReadonly_<T[k]>
}

export type DeepReadonly<T extends object> = DeepReadonly_<T>

//

export type $DeepReadonly_<T> = T extends any ? DeepReadonly_<T> : never

export type $DeepReadonly<T extends object> = $DeepReadonly_<T>
