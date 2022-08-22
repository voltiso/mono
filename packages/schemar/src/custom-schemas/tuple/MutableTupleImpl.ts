// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { Schemable } from '~'
import { CustomTupleImpl, defaultMutableTupleOptions } from '~'

export class MutableTupleImpl<T extends Schemable[]> extends lazyConstructor(
	() => CustomTupleImpl,
)<{}> {
	constructor(shape: T) {
		super({ ...defaultMutableTupleOptions, shape } as never)
	}
}
