// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { lazyConstructor } from '@voltiso/util'

import { CustomUnknownTupleImpl } from './CustomUnknownTupleImpl'
import { defaultMutableUnknownTupleOptions } from './defaultUnknownTupleOptions'

//

export class MutableUnknownTupleImpl extends lazyConstructor(
	() => CustomUnknownTupleImpl,
)<{
	isReadonlyTuple: false
}> {
	constructor() {
		super(defaultMutableUnknownTupleOptions)
	}
}
