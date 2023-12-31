// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { $AssumeType } from '@voltiso/util'
import { useImmediateEffect } from '@voltiso/util.react'
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
export function useReactiveEffect(
	effect: Parameters<typeof useEffect>[0],

	/** Required - without it, it's just `useEffect`, so use `useEffect` instead. */
	deps: DependencyList,
): void {
	// eslint-disable-next-line etc/no-internal, react-hooks/exhaustive-deps
	_useReactiveEffect(effect, deps)
}

/**
 * Triggered only when observables change (not even triggered initially with
 * first values)
 */
export function useReactiveOnlyEffect(
	effect: Parameters<typeof useEffect>[0],

	/** Required - without it, the effect would never trigger. */
	deps: DependencyList,
): void {
	// eslint-disable-next-line etc/no-internal, react-hooks/exhaustive-deps
	_useReactiveEffect(effect, deps, { isReactiveOnly: true })
}

//

//

/** @internal */
function _useReactiveEffect(
	effect: Parameters<typeof useEffect>[0],

	/** Required - without it, it's just `useEffect`, so use `useEffect` instead. */
	deps: DependencyList,

	options?: {
		/** @defaultValue false */
		isReactiveOnly?: boolean

		// 	/**
		// 	 * Do not run the effect as a result of initial values from the first render
		// 	 *
		// 	 * - Note: this is different from ignoring the first effect body call, as the
		// 	 *   reactive update may happen before the first react effect phase
		// 	 */
		// 	ignoreFirstRender?: boolean | undefined
	},
): void {
	const mutable = useMemo(
		() => ({
			destructor: undefined as ReturnType<typeof effect>,
			isEffectRunning: false,
			subscriptions: [] as Subscription[],
		}),
		[],
	)

	const cleanup = () => {
		if (mutable.destructor) {
			try {
				mutable.destructor()
			} finally {
				mutable.destructor = undefined
			}
		}
	}

	const wrappedEffect = () => {
		if (mutable.isEffectRunning) return

		mutable.isEffectRunning = true

		try {
			cleanup()
			mutable.destructor = effect()
		} finally {
			mutable.isEffectRunning = false
		}
	}

	const unsubscribe = () => {
		for (const subscription of mutable.subscriptions) {
			subscription.unsubscribe()
		}

		mutable.subscriptions.length = 0
	}

	const subscribe = () => {
		unsubscribe()

		for (const dep of deps) {
			if (!isObservableLike(dep)) continue

			$AssumeType<Observable<unknown>>(dep)

			const subscription = dep
				// .pipe(skip(1))
				// eslint-disable-next-line rxjs/no-ignored-error
				.subscribe(() => wrappedEffect())

			mutable.subscriptions.push(subscription)
		}
	}

	/**
	 * Reactive-only effect must be subscribed immediately on first render,
	 * because we don't want to miss updates between now and first effect phase
	 */
	if (options?.isReactiveOnly) {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useImmediateEffect(() => {
			subscribe()

			return () => {
				unsubscribe()
				cleanup()
			}
		}, deps)
	} else {
		// eslint-disable-next-line react-hooks/rules-of-hooks
		useEffect(() => {
			subscribe()

			wrappedEffect()

			return () => {
				unsubscribe()
				cleanup()
			}
			// eslint-disable-next-line react-hooks/exhaustive-deps
		}, deps)
	}
}
