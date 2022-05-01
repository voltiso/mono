/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

export function clone<X>(x: X): X

export function clone(x: any) {
	if (typeof x === 'object') {
		if (x === null) return x
		else if (Array.isArray(x)) {
			return x.map(clone)
		} else if (typeof x.clone === 'function') {
			return x.clone()
		} else if (x.constructor === Date) {
			return new Date(x)
		} else {
			// if (x.constructor === Object) {
			const r = {} as any
			const keys = Object.getOwnPropertyNames(x)
			for (const k of keys) {
				r[k] = clone(x[k])
			}

			const symbolKeys = Object.getOwnPropertySymbols(x)
			for (const k of symbolKeys) {
				r[k] = clone(x[k])
			}

			Object.setPrototypeOf(r, Object.getPrototypeOf(x))
			return r
		}
		// else
		// else if (typeof x.valueOf === 'function' && typeof x.constructor === 'function') {
		// 	return new x.constructor(x.valueOf())
		// }
		// else throw new Error(`clone: unable to clone ${x}`)
	} else return x
}
