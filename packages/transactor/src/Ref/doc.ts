// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '../Doc'
import type { DocTag, DocTypes } from '../DocTypes.js'
import type { StrongRef } from './RefBase.js'
import type { WeakDocRef } from './WeakDocRef.js'

type GetDoc<X extends DocTag | IDoc> = X extends IDoc
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: never

export function doc<X extends DocTag | IDoc>(
	x: StrongRef<GetDoc<X>>,
): WeakDocRef<GetDoc<X>> {
	return x as never
}
