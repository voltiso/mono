// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useCurrent } from '@voltiso/util.react'
import type { IObservable } from '@voltiso/util.rxjs'
import { isObservableLike } from '@voltiso/util.rxjs'
import { useEffect, useState } from 'react'
import type { Observable } from 'rxjs'

function getValue<T = unknown>(
	observable$: IObservable,
	fallback: T,
): T | undefined {
	return 'maybeValue' in observable$
		? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			((observable$ as any).maybeValue as T | undefined)
		: 'value' in observable$
			? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
				((observable$ as any).value as T)
			: fallback
}

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
	const current = useCurrent({ value })

	const result = isObservableLike(observable$)
		? getValue(observable$, value)
		: observable$

	useEffect(() => {
		if (!isObservableLike(observable$)) return undefined

		// eslint-disable-next-line rxjs/no-ignored-error
		const subscription = observable$.subscribe(value => setValue(value))

		// value might have changed in the meantime
		const newValue = getValue(observable$, current.value)
		if (current.value !== newValue) setValue(newValue)

		return () => {
			subscription.unsubscribe()
		}
	}, [current, observable$, value])

	return result
}
