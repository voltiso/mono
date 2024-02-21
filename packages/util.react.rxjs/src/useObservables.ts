// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { nullish, StaticError, Throw } from '@voltiso/util'
import { useCurrent, useImmediateEffect } from '@voltiso/util.react'
import { isObservableLike } from '@voltiso/util.rxjs'
import { useState } from 'react'
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

/** Please spread your array! */
export function useObservables(
	_doNotCallWithArray: readonly unknown[] | nullish,
): Throw<'useObservables(): Please spread your array!'>

export function useObservables<Observables extends readonly unknown[]>(
	...observables$: Observables
): GetObservedValues<Observables>

//

export function useObservables<Observables extends readonly unknown[]>(
	...observables$: Observables
): GetObservedValues<Observables> | StaticError {
	const [values, setValues] = useState<GetObservedValues<Observables>>(
		[] as never,
	)
	const current = useCurrent({ values })

	const results = observables$.map((x, index) =>
		// eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
		isObservableLike(x) ? getObservableValue(x, values[index]) : x,
	) as GetObservedValues<Observables>

	useImmediateEffect(() => {
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

		return () => {
			for (const subscription of subscriptions) {
				subscription.unsubscribe()
			}
		}
	}, observables$)

	return results
}
