// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { IS_DOC_REF } from './$$DocRef'
import type { DocRef } from './DocRef'

export function isDocRef(x: unknown): x is DocRef {
	// eslint-disable-next-line security/detect-object-injection
	return !!(x as DocRef | null)?.[IS_DOC_REF]
}
