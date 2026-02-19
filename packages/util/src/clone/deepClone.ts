// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '_'

import type { _, NonStrictPartial } from '~/object'

import { isWithCloneFunction } from './clone'

function deepAssign(
	r: unknown,
	x: unknown,
	options?: NonStrictPartial<CloneOptions> | undefined,
) {
	const descriptors = Object.getOwnPropertyDescriptors(x)

	for (const key of options?.omit ?? []) {
		// eslint-disable-next-line @typescript-eslint/no-dynamic-delete
		delete descriptors[key as never]
	}

	for (const v of Object.values(descriptors)) {
		if ('value' in v) v.value = deepClone(v.value, options) as never

		if (v.get || v.set)
			throw new Error('cannot clone object with getters or setters')
	}

	Object.defineProperties(r, descriptors)
	Object.setPrototypeOf(r, Object.getPrototypeOf(x) as never)
}

export interface CloneOptions {
	omit: readonly (keyof any)[]

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
// eslint-disable-next-line sonarjs/cyclomatic-complexity
export function deepClone<T>(
	value: T,
	inputOptions?: NonStrictPartial<CloneOptions> | undefined,
): T {
	const options: _<
		NonStrictPartial<CloneOptions> & { cache: WeakMap<object, object> }
	> = inputOptions?.cache
		? (inputOptions as typeof inputOptions & { cache: WeakMap<object, object> })
		: { ...inputOptions, cache: new WeakMap() }

	if (typeof value === 'object' && value !== null && options.cache.has(value))
		return options.cache.get(value) as never

	// if(++cnt >= 20) throw new Error('bad')

	// $AssumeType<{ clone?: unknown } | null | undefined>(x)

	if (isWithCloneFunction(value)) {
		const result = value.clone(options) as object
		options.cache.set(value, result)
		return result as never
	}

	/**
	 * Arrays are special - it's not enough to have identical own properties and
	 * prototype
	 */
	if (Array.isArray(value)) {
		const result = [] as unknown[]
		options.cache.set(value, result)
		deepAssign(result, value, options)
		return result as never
	}

	if (typeof value === 'object') {
		if (value === null) return null as never

		if ([Date, Set, Map].includes(value.constructor as never)) {
			$AssumeType<{ constructor: new (x: unknown) => void }>(value)

			const result = new value.constructor(value) as unknown as object
			options.cache.set(value, result)
			deepAssign(result, value, options)
			return result as never
		}

		const result = {} as object
		options.cache.set(value, result)
		deepAssign(result, value, options)
		return result as never
	}

	if (typeof value === 'function') {
		const name = value.name || ''

		const obj = {
			[name](this: unknown, ...args: unknown[]) {
				return Function.prototype.call.call(value, this, ...args) as never
			},
		}

		const result = obj[name] as object

		options.cache.set(value, result)
		deepAssign(result, value, options)
		return result as never
	}

	return value
}
