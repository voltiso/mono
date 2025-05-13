// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import {
	createPortalContextAndComponents,
	PortalContextAndComponents,
} from './importExtensionsPortalInclude'

function useMemo<T>(_fun: () => T, _deps: []): T {
	return 0 as unknown as T
}

export function usePortal(): PortalContextAndComponents {
	return useMemo(() => createPortalContextAndComponents(), [])
}
