// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ReplaceValues<T, V> = { [key in keyof T]: V }

export type Forbidden<T> = ReplaceValues<Partial<T>, never>
