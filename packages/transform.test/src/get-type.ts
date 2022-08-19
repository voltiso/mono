// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type GetType_<L> = object extends L ? object : never

/**
 * Infer type, or identity if already an Inferable
 *
 * @inline
 */
export type GetType<S extends string> = GetType_<S>
