// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { equals } from '@voltiso/util'
import { useMemo } from 'react'

import { callHookDestructors } from './_'
import type { Destructor } from './_/Destructor'
import { useImmediateEffect } from './useImmediateEffect'
import { useInitial } from './useInitial'
import { useOnUnmount } from './useOnUnmount'

/**
 * Similar to `useMemo()`, but allows specifying a cleanup function, similar to
 * how `useEffect()` works
 *
 * - Compares the result with previous using `equals` from `@voltiso/util`, to
 *   decide if it should return the exact same value (useful to avoid triggering
 *   re-renders)
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

	const cleanup = () => {
		callHookDestructors(destructors, 'useMemoCleanup')
	}

	const mutable = useInitial(() => ({ value: Symbol('unset') as T }))

	useImmediateEffect(() => {
		cleanup()

		const newDestructors = [] as Destructor[]

		const newValue = factory((destructor: Destructor) => {
			newDestructors.push(destructor)
		})

		if (equals(mutable.value, newValue)) {
			for (const destructor of newDestructors) {
				destructor()
			}
			return
		}

		destructors.push(...newDestructors)
		mutable.value = newValue
	}, deps)

	useOnUnmount(cleanup)

	return mutable.value
}
