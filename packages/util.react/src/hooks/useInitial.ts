// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isCallable } from '@voltiso/util'
import { useRef } from 'react'

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
export function useInitial<X>(initialValue: X): X

/**
 * All overloads combined (see JSDoc for previous overloads)
 *
 * @returns The initial value
 */
export function useInitial<X>(x: X | (() => X)): X

export function useInitial<X>(x: X | (() => X)): X {
	const initialValue = isCallable(x) ? x() : x
	return useRef(initialValue).current
}
