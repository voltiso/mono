// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { blackbox } from '~/object'

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface ArrayAddToIt<X = unknown> {
	__arrayAddToIt: X[]
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export function arrayAddToIt<X>(...items: X[]): ArrayAddToIt<X> {
	return blackbox({
		__arrayAddToIt: items,
	})
}

export function isArrayAddToIt(x: unknown): x is ArrayAddToIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__arrayAddToIt')
}
