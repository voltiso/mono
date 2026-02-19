// ⠀ⓥ 2026     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { $$Schemable } from '~'

import { CustomTupleImpl } from './CustomTupleImpl'
import { defaultMutableTupleOptions } from './defaultTupleOptions'
import { isRest } from './Rest'

export class MutableTupleImpl<T extends $$Schemable[]> extends lazyConstructor(
	() => CustomTupleImpl,
)<{}> {
	constructor(...shapeWithRest: T) {
		const lastElement = shapeWithRest.at(-1)

		const hasRest = isRest(lastElement)

		const shape = hasRest ? shapeWithRest.slice(0, -1) : shapeWithRest

		const rest = hasRest ? lastElement.element : undefined

		super({ ...defaultMutableTupleOptions, shape, hasRest, rest } as never)
	}
}
