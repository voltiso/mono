// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useMemo } from 'react'

import { createPortalContextAndComponents } from './createPortalContextAndComponents'

export function usePortal() {
	return useMemo(() => createPortalContextAndComponents(), [])
}
