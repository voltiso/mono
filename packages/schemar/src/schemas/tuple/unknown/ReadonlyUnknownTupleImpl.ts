// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import { CustomUnknownTupleImpl } from './CustomUnknownTupleImpl'
import { defaultReadonlyUnknownTupleOptions } from './UnknownTupleOptions'

export class ReadonlyUnknownTupleImpl extends CustomUnknownTupleImpl<{
	isReadonlyTuple: true
}> {
	constructor() {
		super(defaultReadonlyUnknownTupleOptions)
	}
}
