// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomTupleImpl } from './CustomTupleImpl'
import { defaultMutableTupleOptions } from './defaultTupleOptions'
import { isRest } from './Rest'

export class MutableTupleImpl<T extends $$Schemable[]> extends lazyConstructor(
	() => CustomTupleImpl,
)<{}> {
	constructor(...shapeWithRest: T) {
		// eslint-disable-next-line es-x/no-array-string-prototype-at
		const lastElement = shapeWithRest.at(-1)

		const hasRest = isRest(lastElement)

		const shape = hasRest ? shapeWithRest.slice(0, -1) : shapeWithRest

		const rest = hasRest ? lastElement.element : undefined

		super({ ...defaultMutableTupleOptions, shape, hasRest, rest } as never)
	}
}
