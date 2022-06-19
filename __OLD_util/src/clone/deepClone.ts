/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable no-invalid-this */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

function deepAssign(r: any, x: any) {
	const d = Object.getOwnPropertyDescriptors(x)
	for (const v of Object.values(d)) {
		if ('value' in v) v.value = deepClone(v.value)
		if (v.get || v.set)
			throw new Error('cannot clone object with getters or setters')
	}
	Object.defineProperties(r, d)
	Object.setPrototypeOf(r, Object.getPrototypeOf(x))
}

/* eslint-disable max-statements */
export function deepClone<X>(x: X): X

export function deepClone(x: any) {
	if (typeof x?.clone === 'function') {
		return x.clone()
	} else if (typeof x === 'object') {
		if (x === null) return null
		else if ([Date, Set, Map].includes(x.constructor)) {
			const r = new x.constructor(x)
			deepAssign(r, x)
			return r
		} else if (Array.isArray(x)) {
			const r = [] as any
			deepAssign(r, x)
			return r
		} else {
			const r = {} as any
			deepAssign(r, x)
			return r
		}
	} else if (typeof x === 'function') {
		function r(this: unknown, ...args: unknown[]) {
			return Function.prototype.call.call(x, this, ...args)
		}
		deepAssign(r, x)
		return r
	} else return x
}
