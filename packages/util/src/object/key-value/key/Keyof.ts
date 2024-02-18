// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

export type ExpandKeyof<Obj> = {
	[k in keyof Obj]: Obj[k] extends never ? never : k
}[keyof Obj]

/** Distributive */
export type $ExpandKeyof<Obj> = Obj extends any ? ExpandKeyof<Obj> : never

/**
 * Distributive `keyof`
 *
 * @example
 *
 * ```ts
 * type Obj = { a: 1 } | { a: 1; b: 2 }
 * type Result = Keyof<Obj> // "a" | "b" ✅
 * ```
 */
export type $Keyof<X> = X extends any ? keyof X : never
