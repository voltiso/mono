// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useImmediateEffect } from '@voltiso/util.react'
import { isObservableLike } from '@voltiso/util.rxjs'
import { useState } from 'react'
import type { Observable } from 'rxjs'

import { getObservableValue } from './_/getObservableValue'

/**
 * Subscribe to `observable$` and get its value
 *
 * - If `observable$` is a `BehaviorSubject` or `SubjectTree`, it gets the value
 *   using the `.value` or `.maybeValue` getter (mitigate empty render)
 */
export function useObservable<T>(
	observable$: (Observable<T> & { value: T }) | T,
): T

export function useObservable<T>(
	observable$: Observable<T> | T | undefined,
): T | undefined

export function useObservable<T>(
	// eslint-disable-next-line @typescript-eslint/unified-signatures
	observable$: (Observable<T> & { value?: T }) | T | undefined,
): T | undefined

export function useObservable<T>(
	observable$: Observable<T> | T | undefined,
	// ...piped: OperatorFunction<T, T>[]
): T | undefined {
	const [value, setValue] = useState<T>()
	// const current = useCurrent({ value })

	const result = isObservableLike(observable$)
		? getObservableValue(observable$, value)
		: observable$

	useImmediateEffect(() => {
		if (!isObservableLike(observable$)) return undefined

		// eslint-disable-next-line rxjs/no-ignored-error, @typescript-eslint/no-confusing-void-expression
		const subscription = observable$.subscribe(value => setValue(value))

		// // value might have changed in the meantime
		// const newValue = getValue(observable$, current.value)

		// // if (!Object.is(newValue, current.value))
		// setValue(newValue)

		return () => {
			subscription.unsubscribe()
		}
	}, [observable$])

	return result
}
