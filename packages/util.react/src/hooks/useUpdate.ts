// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useCallback, useState } from 'react'

export function useUpdate() {
	// eslint-disable-next-line react/hook-use-state
	const [_x, setX] = useState(0)
	return useCallback(() => setX(x => x + 1), [])
}
