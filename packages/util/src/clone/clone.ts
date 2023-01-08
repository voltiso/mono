// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '~/$strip'
import type { Newable } from '~/function'
import { assign } from '~/object'

export interface WithCloneFunction {
	clone(): this
}

/**
 * Check if `x` has `.clone()` method
 *
 * - ⚠️ Make sure the `.clone()` function returns correct `this` value
 */
export function isWithCloneFunction(x: unknown): x is WithCloneFunction {
	return typeof (x as WithCloneFunction | null)?.clone === 'function'
}

export function clone<X>(x: X): X {
	if (isWithCloneFunction(x)) {
		return x.clone()
	}

	if (typeof x === 'object') {
		if (x === null) return null as never

		if ([Date, Set, Map].includes(x.constructor as never)) {
			$AssumeType<Newable>(x.constructor)
			const r = new x.constructor(x) as never
			assign(r, x)
			return r
		}

		if (Array.isArray(x)) {
			const r = [] as object
			assign(r, x)
			return r as never
		}

		const r = {}
		assign(r, x)
		return r as never
	}

	if (typeof x === 'function') {
		// eslint-disable-next-line func-style
		const clonedFunction = function (this: unknown, ...args: unknown[]) {
			return Function.prototype.call.call(x, this, ...args) as never
		}
		assign(clonedFunction, x as never)
		return clonedFunction as never
	}

	return x
}
