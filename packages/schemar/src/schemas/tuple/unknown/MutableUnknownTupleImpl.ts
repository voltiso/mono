// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomUnknownTupleImpl } from './CustomUnknownTupleImpl'
import { defaultMutableUnknownTupleOptions } from './UnknownTupleOptions'

//

export class MutableUnknownTupleImpl extends CustomUnknownTupleImpl<{
	isReadonlyTuple: false
}> {
	constructor() {
		super(defaultMutableUnknownTupleOptions)
	}
}
