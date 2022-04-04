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
		} else if (x.constructor === Object) {
			const r = {} as any
			for (const [k, v] of Object.entries(x)) {
				r[k] = clone(v)
			}
			return r
		} else if (typeof x.valueOf === 'function' && typeof x.constructor === 'function') {
			return new x.constructor(x.valueOf())
		} else throw new Error(`clone: unable to clone ${x}`)
	} else return x
}
