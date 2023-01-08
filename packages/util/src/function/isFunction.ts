// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { BivariantCallable, BivariantNewable } from './Bivariant'

export function isFunction(
	x: unknown,
): x is
	| BivariantCallable<(...args: unknown[]) => unknown>
	| BivariantNewable<abstract new (...args: unknown[]) => unknown> {
	return typeof x === 'function'
}

/**
 * Warning: use `isFunction` if possible - this does not do any additional
 * checks, but type-casts instead
 */
export function isCallable(
	x: unknown,
): x is BivariantCallable<(...args: unknown[]) => unknown> {
	return typeof x === 'function'
}

/**
 * Warning: use `isFunction` if possible - this does not do any additional
 * checks, but type-casts instead
 */
export function isNewable(
	x: unknown,
): x is BivariantNewable<abstract new (...args: unknown[]) => unknown> {
	return typeof x === 'function'
}
