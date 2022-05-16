/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function assign<T extends object>(r: T, x: T) {
	const d = Object.getOwnPropertyDescriptors(x)
	for (const v of Object.values(d)) {
		if (v.get || v.set) throw new Error('cannot clone/assign object with getters or setters')
	}
	Object.defineProperties(r, d)
	Object.setPrototypeOf(r, Object.getPrototypeOf(x))
}
