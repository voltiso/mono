// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Same as built-in Pick, but no template argument constraint on K */
export type Pick_<O, K> = O extends object ? Pick<O, K & keyof O> : never
