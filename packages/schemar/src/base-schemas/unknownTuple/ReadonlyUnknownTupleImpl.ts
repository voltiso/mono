// ⠀ⓥ 2023     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomUnknownTupleImpl } from './CustomUnknownTupleImpl'
import { defaultReadonlyUnknownTupleOptions } from './defaultUnknownTupleOptions'

export class ReadonlyUnknownTupleImpl extends lazyConstructor(
	() => CustomUnknownTupleImpl,
)<{
	isReadonlyTuple: true
}> {
	constructor() {
		super(defaultReadonlyUnknownTupleOptions)
	}
}
