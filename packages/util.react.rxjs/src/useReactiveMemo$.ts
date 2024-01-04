// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { equals } from '@voltiso/util'
import type { Destructor } from '@voltiso/util.react'
import {
	callHookDestructors,
	useImmediateEffect,
	useInitial,
	useOnUnmount,
} from '@voltiso/util.react'
import type { RequiredSubjectTree } from '@voltiso/util.rxjs'
import { SubjectTree } from '@voltiso/util.rxjs'
import type { DependencyList } from 'react'
import { useMemo } from 'react'

import { useReactiveOnlyEffect } from './useReactiveEffect'

/**
 * Create a new SubjectTree and update its value when deps change, or when
 * Observables in the `deps` array change.
 *
 * - Always returns the exact same `SubjectTree` instance
 * - Only the first value is set during render phase. Subsequent values are
 *   updated in `useEffect()`
 * - Compares result with previous using `equals` from `@voltiso/util`, to decide
 *   if triggering re-render is necessary
 */
export function useReactiveMemo$<T>(
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: DependencyList,
): RequiredSubjectTree<T> {
	const mutable = useMemo(
		() => ({
			destructors: [] as Destructor[],
		}),
		[],
	)

	const memo$ = useInitial(
		() =>
			new SubjectTree(
				factory(destructor => {
					mutable.destructors.push(destructor)
				}),
			),
	)

	const cleanup = () => {
		callHookDestructors(mutable.destructors, 'useReactiveMemo$')
	}

	const update = () => {
		const newDestructors = [] as Destructor[]

		const newValue = factory(destructor => {
			newDestructors.push(destructor)
		})

		if (equals(newValue, memo$.value)) {
			callHookDestructors(newDestructors, 'useReactiveMemo$')
			return
		}

		cleanup()
		mutable.destructors = newDestructors
		// mutable.destructors.push(...newDestructors)
		memo$.set(newValue)
	}

	useImmediateEffect(({ isFirstRender }) => {
		if (isFirstRender) return
		update()
	}, deps)

	useReactiveOnlyEffect(() => {
		update()
	}, deps)

	useOnUnmount(cleanup)

	return memo$
}
