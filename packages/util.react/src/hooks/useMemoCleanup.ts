// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect, useMemo } from 'react'

export type Destructor = () => void

/**
 * Similar to `useMemo()`, but allows specifying a cleanup function, similar to
 * how `useEffect()` works
 *
 * @example
 *
 * ```ts
 * const value = useMemoCleanup(addDestructor => {
 * 	const resource = createResource()
 *
 * 	addDestructor(() => {
 * 		resource.destroy()
 * 	})
 *
 * 	return resource.data
 * }, [])
 * ```
 */
export function useMemoCleanup<T>(
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: readonly unknown[],
): T {
	const destructors = useMemo(() => [] as Destructor[], [])

	const value = useMemo(() => {
		return factory((destructor: Destructor) => {
			destructors.push(destructor)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)

	useEffect(() => {
		return () => {
			for (const destructor of destructors) {
				destructor()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return value
}
