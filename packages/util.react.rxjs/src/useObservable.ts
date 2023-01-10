// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { isObservableLike } from '@voltiso/util.rxjs'
import { useEffect, useState } from 'react'
import type { Observable } from 'rxjs'

/**
 * Subscribe to `observable$` and get its value
 *
 * - If `observable$` is a `BehaviorSubject` or `NestedSubject`, it gets the value
 *   using the `.value` getter (mitigate empty render)
 */
export function useObservable<T>(
	observable$: (Observable<T> & { value: T }) | T,
): T

export function useObservable<T>(
	observable$: Observable<T> | T | undefined,
): T | undefined

export function useObservable<T>(
	observable$: (Observable<T> & { value?: T }) | T | undefined,
): T | undefined

export function useObservable<T>(
	observable$: Observable<T> | T | undefined,
	// ...piped: OperatorFunction<T, T>[]
): T | undefined {
	const [value, setValue] = useState<T>()

	useEffect(() => {
		if (!isObservableLike(observable$)) return undefined

		const subscription = observable$.subscribe(value => setValue(value))

		return () => {
			subscription.unsubscribe()
		}
	}, [observable$])

	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return isObservableLike(observable$)
		? 'value' in observable$
			? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			  (observable$ as any).value
			: value
		: observable$
}
