// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Destructor } from './Destructor'

// eslint-disable-next-line jsdoc/require-throws
/**
 * Utility for implementing hooks that have to call destructors safely in a
 * reverse order.
 *
 * - If there are multiple errors thrown, only the first one is re-thrown, and the
 *   rest is printed to console
 * - Mutates the input array in-place: the resulting array is always left empty,
 *   as the destructors are considered to have been called and should not be
 *   referenced anywhere anymore
 */
export function callHookDestructors(
	destructors: Destructor[],
	hookName: string,
): void {
	let firstError: unknown
	let haveError = false

	destructors.reverse()

	for (const destructor of destructors) {
		try {
			destructor()
		} catch (error) {
			if (haveError) {
				let message = 'Multiple errors in destructors. Next error ignored:'

				// eslint-disable-next-line sonarjs/nested-control-flow
				if (hookName) {
					message = `${hookName}(): ${message}`
				}
				// eslint-disable-next-line no-console
				console.error(message, error)
			} else {
				firstError = error
				haveError = true
			}
		}
	}

	destructors.length = 0

	if (haveError) {
		throw firstError
	}
}
