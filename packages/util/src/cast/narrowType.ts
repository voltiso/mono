// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Narrow type of `x` to `X`
 *
 * @example
 *
 * ```ts
 * const x = 123 // `x` is `number`
 * const y = narrow(x).toType<123 | 234>() // `y` is `123 | 234`
 * ```
 *
 * @param x - Variable to narrow type of
 * @returns `{toType<T>()}`
 */
export function narrow<X>(x: X): { toType<T extends X>(): T } {
	return {
		toType<T extends X>(): T {
			return x as T
		},
	}
}
