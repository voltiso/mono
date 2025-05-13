// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useEffect } from 'react'

export function useOnMount(handleMount: () => void): void {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(handleMount, [])
}
