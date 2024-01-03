// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { type Destructor, useMemoCleanup } from '@voltiso/util.react'
import type { DependencyList } from 'react'

import { useObservables } from './useObservables'

/** Re-render whenever deps change (observes Observables from the deps list too) */
export function useReactiveMemo<T>(
	factory: (addDestructor: (destructor: Destructor) => void) => T,
	deps: DependencyList,
): T {
	const targetDeps = useObservables(...deps) // force re-render with subscriptions
	return useMemoCleanup(factory, targetDeps)
}
