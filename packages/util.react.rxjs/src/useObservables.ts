// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useCurrent } from '@voltiso/util.react'
import { isObservableLike } from '@voltiso/util.rxjs'
import { useEffect, useState } from 'react'
import type { Observable, Subscription } from 'rxjs'

import { getObservableValue } from './_/getObservableValue'

export type _GetObservedValues<
	Ts extends readonly unknown[],
	acc extends unknown[],
> = Ts extends readonly []
	? acc
	: Ts extends [infer T, ...infer Ts]
		? _GetObservedValues<Ts, [...acc, T extends Observable<infer U> ? U : T]>
		: never

export type GetObservedValues<Ts extends readonly unknown[]> =
	_GetObservedValues<Ts, []>

// type A = GetObservedValues<[Observable<string>, Observable<number>, 123]>

export function useObservables<Observables extends readonly unknown[]>(
	...observables$: Observables
): GetObservedValues<Observables> {
	const [values, setValues] = useState<GetObservedValues<Observables>>(
		[] as never,
	)
	const current = useCurrent({ values })

	const results = observables$.map((x, index) =>
		isObservableLike(x) ? getObservableValue(x, values[index]) : x,
	) as GetObservedValues<Observables>

	useEffect(() => {
		const subscriptions: Subscription[] = observables$
			.map((observable$, index) => {
				if (!isObservableLike(observable$)) return null

				// eslint-disable-next-line rxjs/no-ignored-error
				return observable$.subscribe(value => {
					// eslint-disable-next-line es-x/no-object-is
					if (Object.is(value, current.values[index])) return

					const newValues = [
						...current.values,
					] as GetObservedValues<Observables>

					newValues[index] = value as never

					setValues(newValues)
				})
			})
			.filter((x): x is Subscription => !!x)

		// value might have changed in the meantime ???

		return () => {
			for (const subscription of subscriptions) {
				subscription.unsubscribe()
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, observables$)

	return results
}
