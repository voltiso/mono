// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { EmptyArrowCallable } from './EmptyArrowCallable'

export type __unused_ArrowCallableOptions = EmptyArrowCallable

export interface ArrowCallableOptions {
	/** Call implementation */
	call(this: void, ...args: unknown[]): unknown

	/**
	 * An object to shallow-copy properties and `__proto__` from
	 *
	 * - (if not provided, this function only calls {@link EmptyArrowCallable})
	 */
	shape?: object | undefined
}
