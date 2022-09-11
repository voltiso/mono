// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect, useState } from 'react'
import type { BehaviorSubject, Observable, OperatorFunction } from 'rxjs'

export function isBehaviorSubject(x: unknown): x is BehaviorSubject<unknown> {
	return typeof (x as BehaviorSubject<unknown> | null)?.getValue === 'function'
}

//

/**
 * Subscribe to `observable$` and get its value
 *
 * - If `observable$` is a `BehaviorSubject`, it gets the value using the `.value`
 *   getter (mitigate empty render)
 */
export function useObservable<T>(
	observable$: BehaviorSubject<T> | Observable<T>,
	...piped: OperatorFunction<T, T>[]
): T

export function useObservable<T>(
	observable$: undefined,
	...piped: OperatorFunction<T, T>[]
): undefined

export function useObservable<T>(
	observable$: BehaviorSubject<T> | Observable<T> | undefined,
	...piped: OperatorFunction<T, T>[]
): T | undefined

export function useObservable<T>(
	observable$: BehaviorSubject<T> | Observable<T> | undefined,
	...piped: OperatorFunction<T, T>[]
) {
	const [value, setValue] = useState<T>()

	useEffect(() => {
		if (!observable$) return undefined

		const subscription = (
			observable$.pipe as (...piped: OperatorFunction<T, T>[]) => Observable<T>
		)(
			...piped,
			// eslint-disable-next-line rxjs/no-ignored-error
		).subscribe(value => setValue(value))

		return () => {
			subscription.unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [observable$, ...piped])

	return isBehaviorSubject(observable$) ? observable$.value : value
}
