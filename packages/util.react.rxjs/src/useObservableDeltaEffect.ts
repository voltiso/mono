// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { createPatch, isKeepIt } from '@voltiso/util'
import type { DeepPartial_ } from '@voltiso/util'
import { useInitial } from '@voltiso/util.react'
import { isBehaviorSubject } from '@voltiso/util.rxjs'
import type { DependencyList } from 'react'
import type { BehaviorSubject, Observable } from 'rxjs'

import { useObservableEffect } from './useObservableEffect'

export function useObservableDeltaEffect<T>(
	observable$: BehaviorSubject<T> | Observable<T> | undefined,
	effect: (deltaValue: DeepPartial_<T>) => void,
	deps?: DependencyList,
): void {
	const mutable = useInitial(() => {
		const lastValue = isBehaviorSubject(observable$)
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
