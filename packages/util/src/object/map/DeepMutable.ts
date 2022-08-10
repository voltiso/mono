// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type DeepMutable_<T> = {
	-readonly [k in keyof T]: DeepMutable_<T[k]>
}

export type DeepMutable<T extends object | unknown[]> = DeepMutable_<T>

//

export type $DeepMutable_<T> = T extends any ? DeepMutable_<T> : never

export type $DeepMutable<T extends object | unknown[]> = $DeepMutable_<T>
