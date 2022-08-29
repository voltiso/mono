// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'
import { CustomTupleImpl } from './CustomTupleImpl'
import { defaultMutableTupleOptions } from './defaultTupleOptions'

export class MutableTupleImpl<T extends Schemable[]> extends lazyConstructor(
	() => CustomTupleImpl,
)<{}> {
	constructor(shape: T) {
		super({ ...defaultMutableTupleOptions, shape } as never)
	}
}
