// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Create callable anything
 *
 * - Does not work properly with clone()
 * - Works with `Proxy` - see tests
 * - Works by changing function's prototype
 *
 * @example
 *
 * ```ts
 * const a = callable({ a: 1 }, (n: number) => 2 * n)
 *
 * expect(a.a).toBe(1)
 * expect(a(2)).toBe(4)
 * ```
 *
 * @param x - A thing to set as prototype
 * @param f - Function - will be modified
 * @returns Modified `f`
 */
export function callable<X, Fun extends (...args: any) => unknown>(
	x: X,
	f: Fun,
): X & Fun {
	for (const name of Object.getOwnPropertyNames(f)) {
		Reflect.deleteProperty(f, name)
	}

	for (const name of Object.getOwnPropertySymbols(f)) {
		Reflect.deleteProperty(f, name)
	}

	Object.setPrototypeOf(f, x as never)
	return f as never
}
