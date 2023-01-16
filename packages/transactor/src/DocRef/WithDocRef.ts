// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _CustomDocRef } from '~'

export interface WithDocRef {
	docRef: Omit<
		// eslint-disable-next-line etc/no-internal
		_CustomDocRef,
		'asStrongRef' | 'asWeakRef'
	>
}
