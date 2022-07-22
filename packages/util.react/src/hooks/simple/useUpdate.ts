// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useCallback, useState } from 'react'

export function useUpdate() {
	const [_, set] = useState(0)
	return useCallback(() => set(x => x + 1), [])
}
