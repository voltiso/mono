// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable @typescript-eslint/no-unsafe-argument */

/* eslint-disable no-inner-declarations */

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

// let cnt = 0

export function deepClone<X>(x: X): X

export function deepClone(x: any) {
	// if(++cnt >= 20) throw new Error('bad')

	if (typeof x?.clone === 'function') {
		return x.clone()
	}

	if (typeof x === 'object') {
		if (x === null) return null

		if ([Date, Set, Map].includes(x.constructor)) {
			const r = new x.constructor(x)
			deepAssign(r, x)
			return r
		}

		const r = {} as any
		deepAssign(r, x)
		return r
	}

	if (Array.isArray(x)) {
		const r = [] as any
		deepAssign(r, x)
		return r
	}

	if (typeof x === 'function') {
		function r(this: unknown, ...args: unknown[]) {
			return Function.prototype.call.call(x, this, ...args)
		}
		deepAssign(r, x)
		return r
	}

	return x
}
