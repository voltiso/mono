// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * VSCode code-completion hack
 *
 * @example
 *
 * ```ts
 * type Test<X extends 'a' | 'b' | AlsoAccept<string>> = never
 * type R = Test<'... // accepts any `string`, but suggest 'a' or 'b'
 * ```
 */
export type AlsoAccept<X> = X extends {} ? X & {} : X

export type ButReject<Obj extends object> = { [k in keyof Obj]?: never }
export type ButRejectKey<K extends keyof any> = { [k in K]?: never }
