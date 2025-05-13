// ⠀ⓥ 2025     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { _CustomDocRef } from '~'

export interface WithDocRef {
	docRef: Omit<_CustomDocRef, 'asStrongRef' | 'asWeakRef'>
}
