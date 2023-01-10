// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '~/$strip'

import { isWithCloneFunction } from './clone'

function deepAssign(
	r: unknown,
	x: unknown,
	options?: CloneOptions | undefined,
) {
	const d = Object.getOwnPropertyDescriptors(x)

	for (const v of Object.values(d)) {
		if ('value' in v) v.value = deepClone(v.value, options) as never

		if (v.get || v.set)
			throw new Error('cannot clone object with getters or setters')
	}

	Object.defineProperties(r, d)
	Object.setPrototypeOf(r, Object.getPrototypeOf(x) as never)
}

// let cnt = 0

export interface CloneOptions {
	/** Mutable */
	// eslint-disable-next-line es-x/no-weak-map
	cache: WeakMap<object, object>
}

/**
 * Deep clone a value
 *
 * - ✅ Works with circular references
 * - ✅ Isomorphic wrt. object reference equality
 * - ⚠️ Uses `WeakMap`
 * - ⛔ Throws if getters or setters are encountered
 */
export function deepClone<T>(value: T, options?: CloneOptions | undefined): T {
	// eslint-disable-next-line es-x/no-weak-map
	const cache = options?.cache ?? new WeakMap()

	if (typeof value === 'object' && value !== null && cache.has(value))
		return cache.get(value) as never

	// if(++cnt >= 20) throw new Error('bad')

	// $AssumeType<{ clone?: unknown } | null | undefined>(x)

	if (isWithCloneFunction(value)) {
		const result = value.clone({ cache }) as object
		cache.set(value, result)
		return result as never
	}

	/**
	 * Arrays are special - it's not enough to have identical own properties and
	 * prototype
	 */
	if (Array.isArray(value)) {
		const result = [] as unknown[]
		cache.set(value, result)
		deepAssign(result, value, { cache })
		return result as never
	}

	if (typeof value === 'object') {
		if (value === null) return null as never

		if ([Date, Set, Map].includes(value.constructor as never)) {
			$AssumeType<{ constructor: new (x: unknown) => void }>(value)

			const result = new value.constructor(value) as unknown as object
			cache.set(value, result)
			deepAssign(result, value, { cache })
			return result as never
		}

		const result = {} as object
		cache.set(value, result)
		deepAssign(result, value, { cache })
		return result as never
	}

	if (typeof value === 'function') {
		const name = value.name || ''

		const obj = {
			[name](this: unknown, ...args: unknown[]) {
				return Function.prototype.call.call(value, this, ...args) as never
			},
		}

		// eslint-disable-next-line security/detect-object-injection
		const result = obj[name] as object

		cache.set(value, result)
		deepAssign(result, value, { cache })
		return result as never
	}

	return value
}
