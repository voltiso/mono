// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { clone, deepClone } from '~/clone'

import { isPlainObject } from './PlainObject'

/** In-place */
export function freeze<Obj extends object>(
	obj: Obj,
	properties?: (keyof Obj)[] | undefined,
): void {
	if (properties === undefined) {
		Object.freeze(obj)
		return
	}

	for (const p of properties) {
		Object.defineProperty(obj, p, {
			configurable: false,
			writable: false,
			value: obj[p],
		})
	}
}

/** Not in-place */
export function frozen<Obj extends object>(
	obj: Obj,
	properties?: (keyof Obj)[] | undefined,
): Obj {
	const result = clone(obj)
	freeze(result, properties)
	return result
}

//

/** Not in-place */
export function sealed<Obj extends object>(obj: Obj): Obj {
	const result = clone(obj)
	Object.seal(result)
	return result
}

//

/** In-place */
export function deepFreeze<Value>(value: Value): void {
	if (Array.isArray(value)) {
		for (const v of value) {
			deepFreeze(v)
		}
	}

	if (isPlainObject(value)) {
		for (const v of Object.values(value)) {
			deepFreeze(v)
		}
	}

	Object.freeze(value)
}

/** Not in-place */
export function deepFrozen<Value>(value: Value): Value {
	const result = deepClone(value)
	deepFreeze(result)
	return result
}

//

/** In-place */
export function deepSeal<Value>(value: Value): void {
	if (Array.isArray(value)) {
		for (const v of value) {
			deepSeal(v)
		}
	}

	if (isPlainObject(value)) {
		for (const v of Object.values(value)) {
			deepSeal(v)
		}
	}

	Object.seal(value)
}

/** Not in-place */
export function deepSealed<Value>(value: Value): Value {
	const result = deepClone(value)
	deepSeal(result)
	return result
}
