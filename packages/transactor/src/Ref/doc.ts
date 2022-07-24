// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { IDoc } from '../Doc'
import type { DocTag, DocTypes } from '../DocTypes'
import type { Ref } from './RefBase'
import type { WeakDocRef } from './WeakDocRef'

type GetDoc<X extends DocTag | IDoc> = X extends IDoc
	? X
	: X extends keyof DocTypes
	? DocTypes[X]
	: never

export function doc<X extends DocTag | IDoc>(
	x: Ref<GetDoc<X>>,
): WeakDocRef<GetDoc<X>> {
	return x as never
}
