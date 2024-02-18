// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { blackbox } from '~/object'

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface ReplaceIt<X = unknown> {
	__replaceIt: X
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export function replaceIt<X>(x: X): ReplaceIt<X> {
	return blackbox({
		__replaceIt: x,
	})
}

export function isReplaceIt(x: any): x is ReplaceIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__replaceIt')
}
