// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import type { Schemable } from '~'
import { CustomTupleImpl, defaultReadonlyTupleOptions } from '~'

export class ReadonlyTupleImpl<T extends Schemable[]> extends lazyConstructor(
	() => CustomTupleImpl,
)<never> {
	constructor(shape: T) {
		super({ ...defaultReadonlyTupleOptions, shape } as never)
	}
}
