// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	type Destructor,
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
 */
export function useReactiveMemo$<T>(
	factory: (addDestructor?: (destructor: Destructor) => void) => T,
	deps: DependencyList,
): RequiredSubjectTree<T> {
	const mutable = useMemo(
		() => ({
			destructors: [] as Destructor[],
		}),
		[],
	)

	const addDestructor = (destructor: Destructor) => {
		mutable.destructors.push(destructor)
	}

	const callDestructors = () => {
		mutable.destructors.reverse()

		let firstError: unknown
		let haveError = false

		for (const destructor of mutable.destructors) {
			try {
				destructor()
			} catch (error) {
				if (haveError) {
					// eslint-disable-next-line no-console
					console.error(
						'useReactiveMemo$(): Multiple errors in destructors. Next error ignored:',
						error,
					)
				} else {
					firstError = error
					haveError = true
				}
			}
		}

		mutable.destructors.length = 0

		if (haveError) {
			throw firstError
		}
	}

	const memo$ = useInitial(() => new SubjectTree(factory(addDestructor)))

	const update = () => {
		callDestructors()
		const memo = factory(addDestructor)
		memo$.set(memo)
	}

	useImmediateEffect(({ isFirstRender }) => {
		if (isFirstRender) return
		update()
	}, deps)

	useReactiveOnlyEffect(() => {
		update()
	}, deps)

	useOnUnmount(callDestructors)

	return memo$
}
