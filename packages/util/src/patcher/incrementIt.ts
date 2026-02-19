// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { blackbox } from '~/object'

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface IncrementIt<By extends number | bigint = number | bigint> {
	__incrementIt: By
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export function incrementIt<Amount extends number | bigint>(
	incrementBy: Amount,
): IncrementIt<Amount> {
	return blackbox({
		__incrementIt: incrementBy,
	})
}

export function isIncrementIt(x: unknown): x is IncrementIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__incrementIt')
}
