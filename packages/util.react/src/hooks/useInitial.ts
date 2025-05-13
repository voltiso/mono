// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

/* eslint-disable jsdoc/informative-docs */

import { isCallable } from '@voltiso/util'
import { useMemo } from 'react'

/**
 * - Equivalent to `useRef(() => initialValue).current`
 *
 * @example
 *
 * ```ts
 * const myData = useInitial(() => ({ foo: 'bar' })) // always returns the same object
 * ```
 *
 * @param getInitialValue - Function returning initial value
 * @returns The initial value
 */
export function useInitial<X>(getInitialValue: () => X): X

/**
 * - Equivalent to `useRef(initialValue).current`
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
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function useInitial<X>(initialValue: X): X

/**
 * All overloads combined (see JSDoc for previous overloads)
 *
 * @returns The initial value
 */
// eslint-disable-next-line @typescript-eslint/unified-signatures
export function useInitial<X>(x: X | (() => X)): X

//

export function useInitial<X>(x: X | (() => X)): X {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useMemo(() => (isCallable(x) ? x() : x), [])

	// if (isCallable(x)) {
	// 	// eslint-disable-next-line react-hooks/rules-of-hooks
	// 	return useMemo<X>(x, [])
	// }
	// // eslint-disable-next-line react-hooks/rules-of-hooks
	// return useRef(x).current

	//

	// const initialValue = isCallable(x) ? x() : x
	// return useRef(initialValue).current
}
