/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Create callable anything
 *  - Does not work properly with clone()
 *  - Works by changing function's prototype
 * @param x a thing to set as prototype
 * @param f function - will be modified
 * @returns modified `f`
 */
export function callable<X, Fun extends (...args: any) => unknown>(
	x: X,
	f: Fun
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
