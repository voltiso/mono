// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DependencyList } from 'react'
import { useEffect } from 'react'

export function useOnUnmount(
	handleUnmount: () => void,
	deps?: DependencyList,
): void {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => handleUnmount, deps || [])
}
