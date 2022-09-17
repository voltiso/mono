// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isBehaviorSubject } from '@voltiso/util.rxjs'
import { useEffect, useState } from 'react'
import type { BehaviorSubject, Observable } from 'rxjs'
import { isObservable } from 'rxjs'

//

/**
 * Subscribe to `observable$` and get its value
 *
 * - If `observable$` is a `BehaviorSubject`, it gets the value using the `.value`
 *   getter (mitigate empty render)
 */
export function useObservable<T>(
	observable$: BehaviorSubject<T> | Observable<T> | T,
	// ...piped: OperatorFunction<T, T>[]
): T

export function useObservable(
	observable$: undefined,
	// ...piped: OperatorFunction<T, T>[]
): undefined

export function useObservable<T>(
	observable$: BehaviorSubject<T> | Observable<T> | T | undefined,
	// ...piped: OperatorFunction<T, T>[]
): T | undefined

export function useObservable<T>(
	observable$: BehaviorSubject<T> | Observable<T> | T | undefined,
	// ...piped: OperatorFunction<T, T>[]
): T | undefined {
	const [value, setValue] = useState<T>()

	useEffect(() => {
		if (!observable$ || !isObservable(observable$)) return undefined

		// eslint-disable-next-line rxjs/no-ignored-error
		const subscription = observable$.subscribe(value => setValue(value))

		// const subscription = (
		// 	observable$.pipe as (...piped: OperatorFunction<T, T>[]) => Observable<T>
		// )(
		// 	...piped,
		// 	// eslint-disable-next-line rxjs/no-ignored-error
		// ).subscribe(value => setValue(value))

		return () => {
			subscription.unsubscribe()
		}
	}, [
		observable$,
		// ...piped
	])

	return isBehaviorSubject<T>(observable$)
		? observable$.value
		: isObservable(observable$)
		? value
		: observable$
}
