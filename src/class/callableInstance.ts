/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable func-style */

export function callableInstance<This extends object, Fun extends (this: This, ...args: never[]) => unknown>(
	thisArg: This,
	fun: Fun
): This & Fun {
	const f = (...args: Parameters<Fun>) => {
		return fun.call(thisArg, ...args)
	}
	Object.setPrototypeOf(f, thisArg)
	return f as any
}
