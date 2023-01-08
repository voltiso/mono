// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DependencyList } from 'react'
import { useEffect } from 'react'
import type { BehaviorSubject, Observable } from 'rxjs'

export function useObservableEffect<T>(
	observable$: BehaviorSubject<T> | Observable<T> | undefined,
	effect: (value: T) => void,
	deps?: DependencyList,
) {
	useEffect(() => {
		if (!observable$) return undefined

		// eslint-disable-next-line rxjs/no-ignored-error
		const subscription = observable$.subscribe(effect)

		return () => subscription.unsubscribe()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [observable$, ...(deps || [])])
}
