// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { blackbox } from '~/object'

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface KeepIt {
	__keepIt: true
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export const keepIt: KeepIt = blackbox({
	__keepIt: true as const,
})

export function isKeepIt(x: any): x is KeepIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__keepIt')
}
