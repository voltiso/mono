// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { equals } from '@voltiso/util'
import {
	callHookDestructors,
	type Destructor,
	useUpdate,
} from '@voltiso/util.react'
import { type DependencyList, useMemo } from 'react'

import { useReactiveImmediateEffect } from './useReactiveEffect'

/**
 * Trigger `factory` when deps change (observes Observables from the deps list
 * too)
 *
 * - Compares result with previous using `equals` from `@voltiso/util`, to decide
 *   if triggering re-render is necessary
 */
export function useReactiveMemo<T>(
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: DependencyList,
): T {
	const update = useUpdate()

	const mutable = useMemo(
		() => ({
			value: Symbol('unset') as T,
			isInHookBody: true,
		}),
		[],
	)

	mutable.isInHookBody = true

	try {
		useReactiveImmediateEffect(() => {
			const newDestructors = [] as Destructor[]

			const newValue = factory(destructor => {
				newDestructors.push(destructor)
			})

			if (equals(newValue, mutable.value)) {
				callHookDestructors(newDestructors, 'useReactiveMemo')
				return undefined
			}

			mutable.value = newValue

			if (!mutable.isInHookBody) {
				update()
			}

			return () => {
				callHookDestructors(newDestructors, 'useReactiveMemo')
			}
		}, deps)
	} finally {
		mutable.isInHookBody = false
	}

	return mutable.value

	// const targetDeps = useObservables(...deps) // force re-render with subscriptions
	// return useMemoCleanup(factory, targetDeps)
}
