// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ToStringKey<X extends keyof any> = X extends number ? `${X}` : X

export type StringKeyof<T> = ToStringKey<keyof T>
