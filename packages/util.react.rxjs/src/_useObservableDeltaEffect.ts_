// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DeepPartial_ } from '@voltiso/util'
import { createPatch, isKeepIt } from '@voltiso/util'
import { useInitial } from '@voltiso/util.react'
import { isObservableLike } from '@voltiso/util.rxjs'
import type { DependencyList } from 'react'
import type { Observable } from 'rxjs'

import { useObservableEffect } from './useObservableEffect'

export function useObservableDeltaEffect<T>(
	observable$: (Observable<T> & { value?: T }) | undefined,
	effect: (deltaValue: DeepPartial_<T>) => void,
	deps?: DependencyList,
): void {
	const mutable = useInitial(() => {
		const lastValue = isObservableLike(observable$)
			? observable$.value
			: undefined
		return { lastValue }
	})

	useObservableEffect(
		observable$,
		value => {
			const patch = createPatch(mutable.lastValue, value)
			if (isKeepIt(patch)) return // ignore
			effect(patch as never)
		},
		deps,
	)
}
