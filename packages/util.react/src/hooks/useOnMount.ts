// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect } from 'react'

export function useOnMount(handleMount: () => void): void {
	// biome-ignore lint/correctness/useExhaustiveDependencies: .
	useEffect(handleMount, [])
}
