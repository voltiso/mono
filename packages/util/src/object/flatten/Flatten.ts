// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type _<T> = [{ [k in keyof T]: T[k] }][0]

export type __<T> = { [k in keyof T]: _<T[k]> }

export type ___<T> = { [k in keyof T]: __<T[k]> }
