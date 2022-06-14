/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Create callable object
 *  - Works with clone (if I remember correctly)
 * @param obj object to copy properties from (shallow copy)
 * @param f function - will be modified
 * @returns modified `f`
 */
export function callableObject<
	Obj extends object,
	Fun extends (...args: any) => unknown
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
