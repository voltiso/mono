// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DependencyList } from 'react'
import { useEffect } from 'react'
import type { Observable } from 'rxjs'

/**
 * Runs effect when either:
 *
 * - Observable emits
 * - Deps change
 * - If it's a subject (has `.value`), also runs effect immediately
 */
export function useObservableEffect<T>(
	observable$:
		| (Observable<T> & {
				readonly value?: T
				readonly maybeValue?: T | undefined
		  })
		| undefined,
	effect: (value: T | undefined) => void,
	deps?: DependencyList,
) {
	useEffect(() => {
		if (!observable$) return undefined

		// eslint-disable-next-line rxjs/no-ignored-error
		const subscription = observable$.subscribe(effect)

		if ('maybeValue' in observable$) effect(observable$.maybeValue)
		else if ('value' in observable$) effect(observable$.value)

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [observable$, ...(deps || [])])
}
