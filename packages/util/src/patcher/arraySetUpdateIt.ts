// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { blackbox } from '~/object'

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface ArraySetUpdateIt<Add = unknown, Remove = unknown> {
	__arraySetUpdateIt: {
		add?: Add[] | undefined
		remove?: Remove[] | undefined
	}
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export function arraySetAddToIt<X>(...items: X[]): ArraySetUpdateIt<X, never> {
	return blackbox({
		__arraySetUpdateIt: {
			add: items,
		},
	})
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export function arraySetRemoveFromIt<X>(
	...items: X[]
): ArraySetUpdateIt<never, X> {
	return blackbox({
		__arraySetUpdateIt: {
			remove: items,
		},
	})
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export function arraySetUpdateIt<Add, Remove>(params: {
	add?: Add[] | undefined
	remove?: Remove[] | undefined
}): ArraySetUpdateIt<Add, Remove> {
	return blackbox({
		__arraySetUpdateIt: params,
	})
}

export function isArraySetUpdateIt(x: unknown): x is ArraySetUpdateIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__arraySetUpdateIt')
}
