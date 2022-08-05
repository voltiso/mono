// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useRef } from 'react'

/**
 * - Equivalent to `useRef(x).current`
 *
 * @example
 *
 * ```ts
 * const myData = useInitial({ foo: 'bar' }) // always returns the same object
 * ```
 *
 * @param initialValue - Initial value
 * @returns The initial value
 */
export function useInitial<X>(initialValue: X) {
	return useRef(initialValue).current
}
