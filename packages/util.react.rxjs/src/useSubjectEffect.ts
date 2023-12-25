// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'
import { useCurrent } from '@voltiso/util.react'
import { isObservableLike } from '@voltiso/util.rxjs'
import type { DependencyList } from 'react'
import { useEffect, useMemo } from 'react'
import type { Observable, Subscription } from 'rxjs'

/**
 * Similar to `useEffect`, but also subscribes to subjects in the `deps` array.
 * Usable with BehaviorSubjects that have `.value` field, or with
 * `SubjectTree`.
 *
 * - ⚠️ Ignores recursive effect calls
 */
export function useSubjectEffect<T>(
	effect: Parameters<typeof useEffect>[0],
	/** Required - without it, it's just `useEffect`, so use `useEffect` instead. */
	deps: DependencyList,
) {
	const mutable = useMemo(
		() => ({
			destructor: undefined as ReturnType<typeof effect>,
			isEffectRunning: false,
		}),
		[],
	)

	const effectWrapper = () => {
		if (mutable.isEffectRunning) return

		mutable.isEffectRunning = true

		try {
			if (mutable.destructor) {
				try {
					mutable.destructor()
				} finally {
					mutable.destructor = undefined
				}
			}

			mutable.destructor = effect()
		} finally {
			mutable.isEffectRunning = false
		}
	}

	const current = useCurrent({
		effectWrapper,
	})

	useEffect(() => {
		const subscriptions: Subscription[] = []

		for (const dep of deps) {
			if (!isObservableLike(dep)) continue

			$AssumeType<Observable<T>>(dep)

			// eslint-disable-next-line rxjs/no-ignored-error
			const subscription = dep.subscribe(() => current.effectWrapper())
			subscriptions.push(subscription)
		}

		current.effectWrapper()

		return () => {
			for (const subscription of subscriptions) {
				subscription.unsubscribe()
			}

			if (mutable.destructor) mutable.destructor()
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps)
}
