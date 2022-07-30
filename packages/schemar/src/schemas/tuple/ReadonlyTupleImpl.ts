// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { Schemable } from '~'
import { CustomTupleImpl, defaultReadonlyTupleOptions } from '~'

export class ReadonlyTupleImpl<
	T extends Schemable[],
> extends CustomTupleImpl<never> {
	constructor(elementSchemas: T) {
		super({ ...defaultReadonlyTupleOptions, elementSchemas } as never)
	}
}
