// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable etc/no-misused-generics */

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
export function narrow<X>(x: X) {
	return {
		toType<T extends X>() {
			return x as T
		},
	}
}
