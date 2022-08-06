// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { RefCallback } from 'react'

export function combineRefCallbacks<T>(...refs: readonly RefCallback<T>[]) {
	return (instance: T | null) => {
		for (const ref of refs) {
			ref(instance)
		}
	}
}
