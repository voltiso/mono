// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { assign } from '../object'

/* eslint-disable no-inner-declarations */

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */

export function clone<X>(x: X): X

export function clone(x: any) {
	if (typeof x?.clone === 'function') {
		return x.clone()
	}

	if (typeof x === 'object') {
		if (x === null) return null

		if ([Date, Set, Map].includes(x.constructor)) {
			const r = new x.constructor(x)
			assign(r, x)
			return r
		}

		if (Array.isArray(x)) {
			const r = [] as any
			assign(r, x)
			return r
		}

		const r = {} as any
		assign(r, x)
		return r
	}

	if (typeof x === 'function') {
		function r(this: unknown, ...args: unknown[]) {
			return Function.prototype.call.call(x, this, ...args)
		}
		assign(r, x)
		return r
	}

	return x
}
