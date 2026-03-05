// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DependencyList } from 'react'
import { useEffect } from 'react'

export function useOnUnmount(
	handleUnmount: () => void,
	deps?: DependencyList,
): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: .
	useEffect(() => handleUnmount, deps || [])
}
