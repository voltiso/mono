// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { equals, UNSET } from '@voltiso/util'
import type { Destructor } from '@voltiso/util.react'
import { callHookDestructors, useUpdate } from '@voltiso/util.react'
import type { DependencyList } from 'react'
import { useMemo } from 'react'

import { useCustomReactiveEffect } from './useReactiveEffect'

export interface ReactiveMemoOptions {
	/**
	 * `false` means run synchronously when Subject emits.
	 *
	 * `true` means use `requestAnimationFrame` to run the effect asynchronously.
	 * This also means that the effect may not run on every observable change, but
	 * rather group updates for better performance.
	 *
	 * - (`setTimeout` is very slow, `requestAnimationFrame` is much better - tested
	 *   in Firefox)
	 *
	 * @defaultValue `true`
	 */
	isLazy?: boolean

	/**
	 * - Compares result with previous using `equals` from `@voltiso/util`, to
	 *   decide if should actually update (avoids re-renders)
	 *
	 * @defaultValue `true`
	 */
	compare?: boolean
}

/**
 * Trigger `factory` when deps change (observes Observables from the deps list
 * too)
 *
 * - Compares result with previous using `equals` from `@voltiso/util`, to decide
 *   if should actually update (avoids re-renders)
 */
export function useReactiveMemo<T>(
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: DependencyList,
): T {
	return useCustomReactiveMemo({}, factory, deps)
}

/** Maps to `useCustomReactiveMemo({ isLazy: false }, factory, deps)` */
export function useEagerReactiveMemo<T>(
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: DependencyList,
): T {
	return useCustomReactiveMemo({ isLazy: false }, factory, deps)
}

/**
 * Trigger `factory` when deps change (observes Observables from the deps list
 * too)
 */
export function useCustomReactiveMemo<T>(
	options: ReactiveMemoOptions,
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: DependencyList,
): T {
	const compare = options.compare ?? true
	const isLazy = options.isLazy ?? true

	const update = useUpdate()

	const mutable = useMemo(
		() => ({
			value: UNSET as T,
			isInHookBody: true,
		}),
		[],
	)

	mutable.isInHookBody = true

	try {
		// biome-ignore lint/correctness/useHookAtTopLevel: .
		useCustomReactiveEffect(
			{ isLazy, isImmediate: true },
			() => {
				const newDestructors = [] as Destructor[]

				const newValue = factory(destructor => {
					newDestructors.push(destructor)
				})

				if (compare && equals(newValue, mutable.value)) {
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
			},
			deps,
		)
	} finally {
		mutable.isInHookBody = false
	}

	return mutable.value

	// const targetDeps = useObservables(...deps) // force re-render with subscriptions
	// return useMemoCleanup(factory, targetDeps)
}
