// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DependencyList, Ref } from 'react'
import { useImperativeHandle } from 'react'

import { useObservables } from './useObservables'

export function useReactiveImperativeHandle<T, R extends T>(
	ref: Ref<T> | undefined,
	init: () => R,
	deps?: DependencyList,
): void {
	const targetDeps = useObservables(deps ?? []) // force re-render with subscriptions
	// eslint-disable-next-line react-hooks/exhaustive-deps
	return useImperativeHandle<T, R>(ref, init, deps ? targetDeps : undefined)
}
