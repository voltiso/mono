// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useRef } from 'react'

/**
 * - Equivalent to `useRef(x).current`
 *
 * @example
 *
 * ```ts
 * const myData = useConst({ foo: 'bar' }) // always returns the same object
 * ```
 *
 * @param x - Initial value
 * @returns The initial value
 */
export function useConst<X>(x: X) {
	return useRef(x).current
}
