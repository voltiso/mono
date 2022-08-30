// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect, useState } from 'react'
import type { BehaviorSubject, Observable, OperatorFunction } from 'rxjs'

export function useBehaviorSubject<T>(
	behaviorSubject: BehaviorSubject<T> | undefined,
	...piped: OperatorFunction<T, T>[]
) {
	// eslint-disable-next-line react/hook-use-state
	const [, set] = useState(0) // forceUpdate

	useEffect(() => {
		if (!behaviorSubject) return

		const subscription = (
			behaviorSubject.pipe as (
				...piped: OperatorFunction<T, T>[]
			) => Observable<T>
		)(...piped).subscribe(() => set(x => x + 1)) // don't care about value - just forceUpdate

		// eslint-disable-next-line consistent-return
		return () => {
			subscription.unsubscribe()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [behaviorSubject, ...piped])

	return behaviorSubject?.value
}
