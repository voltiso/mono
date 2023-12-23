// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'
import { isObservableLike } from '@voltiso/util.rxjs'
import type { DependencyList } from 'react'
import { useEffect } from 'react'
import type { Observable, Subscription } from 'rxjs'

/**
 * Similar to `useEffect`, but also subscribes to subjects in the `deps` array.
 * Usable with BehaviorSubjects that have `.value` field, or with
 * `SubjectTree`.
 */
export function useSubjectEffect<T>(
	effect: () => void,
	/** Required - without it, it's just `useEffect`, so use `useEffect` instead. */
	deps: DependencyList,
) {
	useEffect(() => {
		effect()

		const subscriptions: Subscription[] = []

		for (const dep of deps) {
			if (!isObservableLike(dep)) continue

			$AssumeType<Observable<T>>(dep)

			const subscription = dep.subscribe(() => effect())
			subscriptions.push(subscription)
		}

		return () => {
			for (const subscription of subscriptions) {
				subscription.unsubscribe()
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)
}
