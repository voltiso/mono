// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect, useState } from 'react'
import type { Observable } from 'rxjs'

export function useObservable<T>(observable: Observable<T> | undefined) {
	const [value, setValue] = useState<T>()

	useEffect(() => {
		if (!observable) return undefined

		const subscription = observable.subscribe(x => setValue(x))
		return () => {
			subscription.unsubscribe()
		}
	}, [observable])

	return value
}
