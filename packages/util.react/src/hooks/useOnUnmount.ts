// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type React from 'react'
import { useEffect } from 'react'

export const useOnUnmount = (
	handleUnmount: () => void,
	deps?: React.DependencyList,
) => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(() => handleUnmount, deps || [])
}
