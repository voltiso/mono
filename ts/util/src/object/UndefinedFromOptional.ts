// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type UndefinedFromOptional<T> = {
	[k in keyof T]: T[k] | (undefined extends T[k] ? undefined : never)
}
