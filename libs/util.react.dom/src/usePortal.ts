// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { useMemo } from 'react'

import type { PortalContextAndComponents } from './createPortalContextAndComponents'
import { createPortalContextAndComponents } from './createPortalContextAndComponents'

export function usePortal(): PortalContextAndComponents {
	return useMemo(() => createPortalContextAndComponents(), [])
}
