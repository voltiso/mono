// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '~'
import { CustomTupleImpl, defaultMutableTupleOptions } from '~'

export class MutableTupleImpl<
	T extends Schemable[],
> extends CustomTupleImpl<{}> {
	constructor(elementSchemas: T) {
		super({ ...defaultMutableTupleOptions, elementSchemas } as never)
	}
}
