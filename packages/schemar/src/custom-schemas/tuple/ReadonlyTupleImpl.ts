// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { $$Schemable } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'

import { CustomTupleImpl } from '~'

import { defaultReadonlyTupleOptions } from './defaultTupleOptions'

export class ReadonlyTupleImpl<T extends $$Schemable[]> extends lazyConstructor(
	() => CustomTupleImpl,
)<never> {
	constructor(shape: T) {
		super({ ...defaultReadonlyTupleOptions, shape } as never)
	}
}
