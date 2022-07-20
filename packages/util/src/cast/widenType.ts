// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable etc/no-misused-generics */

/**
 * Widen `x` to type `T`
 *
 * @example
 *
 * ```ts
 * const x = 123 as const
 * const y = widen(x).toType<123 | 234>()
 * ```
 *
 * @param x - Variable to widen type of
 * @returns `{toType<T>()}`
 */
export function widen<X>(x: X) {
	return {
		toType<T>(): X extends T ? T : never {
			return x as unknown as X extends T ? T : never
		},
	}
}
