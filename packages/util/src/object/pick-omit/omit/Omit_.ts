// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/** Same as built-in Omit, but no template argument constraint on K */
export type Omit_<O, K> = O extends object ? Omit<O, K & keyof O> : never
