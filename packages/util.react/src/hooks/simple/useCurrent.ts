// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
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
 * @param x - Object with current properties to use by callbacks
 * @returns Proxy to the current value (always the same Proxy object)
 */
export function useCurrent<X extends object>(x: X): X {
	return Object.setPrototypeOf(useRef({}).current, x) as X
}

// export function useCurrent<X extends object>(x: X): X {
// 	const r = useRef<{ t: object; p: X }>()
// 	if (!r.current) {
// 		const t = {} as X
// 		r.current = {
// 			t,
// 			p: new Proxy(t, {
// 				get(_t, p) {
// 					return Reflect.get(t, p) as unknown
// 				},
// 			}),
// 		}
// 	}
// 	return r.current!.p
// }
