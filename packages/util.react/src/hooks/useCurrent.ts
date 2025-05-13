// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useRef } from 'react'

// TODO: implement eslint rule to not depend on current.*

/**
 * Update values without the need to update callbacks
 *
 * @example
 *
 * ```ts
 * const upToDateState = useCurrent({ foo: 'currentFooValue' })
 * ```
 *
 * @param currentValues - Object with current properties to use by callbacks
 * @returns Proxy to the current value (always the same Proxy object)
 */
export function useCurrent<Current extends object>(
	currentValues: Current,
): Current {
	return Object.setPrototypeOf(useRef({}).current, currentValues) as Current
}
