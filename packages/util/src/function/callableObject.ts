// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/**
 * Create callable object
 *
 * - Works with `clone`
 * - Does not bind `this` context!
 *
 * @example
 *
 * ```ts
 * const a = callableObject({ a: 1 }, (n: number) => 2 * n)
 *
 * expect(a.a).toBe(1)
 * expect(a(2)).toBe(4)
 * ```
 *
 * @param obj - Object to copy properties from (shallow copy)
 * @param f - Function - will be modified
 * @returns Modified `f`
 */
export function callableObject<
	Obj extends object,
	Fun extends (...args: any) => unknown,
>(obj: Obj, f: Fun): Obj & Fun {
	for (const name of Object.getOwnPropertyNames(f)) {
		Reflect.deleteProperty(f, name)
	}

	for (const name of Object.getOwnPropertySymbols(f)) {
		Reflect.deleteProperty(f, name)
	}

	Object.defineProperties(f, Object.getOwnPropertyDescriptors(obj))
	Object.setPrototypeOf(f, Object.getPrototypeOf(obj) as object)
	return f as never
}
