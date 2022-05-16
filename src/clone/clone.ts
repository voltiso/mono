/* eslint-disable no-inner-declarations */
/* eslint-disable no-invalid-this */
/* eslint-disable max-statements */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { assign } from '../object'

export function clone<X>(x: X): X

export function clone(x: any) {
	if (typeof x?.clone === 'function') {
		return x.clone()
	} else if (typeof x === 'object') {
		if (x === null) return null
		else if ([Date, Set, Map].includes(x.constructor)) {
			const r = new x.constructor(x)
			assign(r, x)
			return r
		} else if (Array.isArray(x)) {
			const r = [] as any
			assign(r, x)
			return r
		} else {
			const r = {} as any
			assign(r, x)
			return r
		}
	} else if (typeof x === 'function') {
		function r(this: unknown, ...args: unknown[]) {
			return Function.prototype.call.call(x, this, ...args)
		}
		assign(r, x)
		return r
	} else return x
}
