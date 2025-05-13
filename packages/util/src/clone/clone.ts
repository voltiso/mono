// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '_'

import type { Newable } from '~/function'
import type { HasIndexSignature, NonStrictPartial, Omit_ } from '~/object'
import { assign } from '~/object'

import type { CloneOptions } from './deepClone'

export interface WithCloneFunction {
	clone(options?: NonStrictPartial<CloneOptions> | undefined): this
}

/**
 * Check if `x` has `.clone()` method
 *
 * - ⚠️ Make sure the `.clone()` function returns correct `this` value
 */
export function isWithCloneFunction(x: unknown): x is WithCloneFunction {
	return typeof (x as WithCloneFunction | null)?.clone === 'function'
}

export function clone<X, Options extends NonStrictPartial<CloneOptions>>(
	x: X,
	options?: Options | undefined,
): X extends (...args: any) => any
	? X
	: HasIndexSignature<X> extends true
		? X
		: Options extends { omit: Iterable<infer V> }
			? Omit_<X, V>
			: X {
	if (typeof x === 'object' && x !== null && options?.cache?.has(x))
		return options.cache.get(x) as never

	if (isWithCloneFunction(x)) {
		return x.clone(options) as never
	} else if (typeof x === 'object') {
		if (x === null) return null as never

		if ([Date, Set, Map].includes(x.constructor as never)) {
			$AssumeType<Newable>(x.constructor)
			const r = new x.constructor(x) as never
			assign(r, x, options)
			return r
		}

		if (Array.isArray(x)) {
			const r = [] as object
			assign(r, x, options)
			return r as never
		}

		const r = {}
		assign(r, x, options)
		return r as never
	} else if (typeof x === 'function') {
		// eslint-disable-next-line func-style
		const clonedFunction = function (this: unknown, ...args: unknown[]) {
			return Function.prototype.call.call(x, this, ...args) as never
		}
		assign(clonedFunction, x as never, options)
		return clonedFunction as never
	} else return x as never
}
