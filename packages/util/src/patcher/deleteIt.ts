// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { blackbox } from '~/object'

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface DeleteIt {
	__deleteIt: true
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export const deleteIt: DeleteIt = blackbox({
	__deleteIt: true as const,
})

export function isDeleteIt(x: unknown): x is DeleteIt {
	return Object.prototype.hasOwnProperty.call(x || {}, '__deleteIt')
}

//

/**
 * Idempotent version (safe to call multiple times)
 *
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export interface DeleteItIfPresent {
	__deleteItIfPresent: true
}

/**
 * ⚠️ Sets null property to not be seen as a plain object
 *
 * - This way the library can detect its objects even if multiple instances of the
 *   library are in memory
 */
export const deleteItIfPresent: DeleteItIfPresent = blackbox({
	__deleteItIfPresent: true as const,
})

export function isDeleteItIfPresent(x: unknown): x is DeleteItIfPresent {
	return Object.prototype.hasOwnProperty.call(x || {}, '__deleteItIfPresent')
}
