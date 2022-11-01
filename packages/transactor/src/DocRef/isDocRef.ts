// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { IS_DOC_REF } from './$$DocRef'
import type { DocRef } from './StrongDocRef'
import type { WeakDocRef } from './WeakDocRef'

/** ⚠️ A strong ref is also a weak ref */
export function isDocRef(x: unknown): x is DocRef | WeakDocRef {
	// eslint-disable-next-line security/detect-object-injection
	return !!(x as WeakDocRef | null)?.[IS_DOC_REF]
}

// /** ⚠️ A strong ref is also a weak ref */
// export function isStrongDocRef(x: unknown): x is DocRef {
// 	return isDocRef(x) && x.isStrong
// }
