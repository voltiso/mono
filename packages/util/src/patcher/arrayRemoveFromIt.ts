// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { blackbox } from '~/object'

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface ArrayRemoveFromIt<X = unknown> {
	__arrayRemoveFromIt: X[]
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export function arrayRemoveFromIt<X>(...x: X[]): ArrayRemoveFromIt<X> {
	return blackbox({
		__arrayRemoveFromIt: x,
	})
}

export function isArrayRemoveFromIt(x: unknown): x is ArrayRemoveFromIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__arrayRemoveFromIt')
}
