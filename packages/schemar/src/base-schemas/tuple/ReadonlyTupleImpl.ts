// ⠀ⓥ 2024     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { $$Schemable } from '~'

import { CustomTupleImpl } from './CustomTupleImpl'
import { defaultReadonlyTupleOptions } from './defaultTupleOptions'
import { isRest } from './Rest'

export class ReadonlyTupleImpl<T extends $$Schemable[]> extends lazyConstructor(
	() => CustomTupleImpl,
)<never> {
	constructor(...shapeWithRest: T) {
		// eslint-disable-next-line es-x/no-array-prototype-at
		const lastElement = shapeWithRest.at(-1)

		const hasRest = isRest(lastElement)

		const shape = hasRest ? shapeWithRest.slice(0, -1) : shapeWithRest

		const rest = hasRest ? lastElement.element : undefined

		super({ ...defaultReadonlyTupleOptions, shape, rest, hasRest } as never)
	}
}
