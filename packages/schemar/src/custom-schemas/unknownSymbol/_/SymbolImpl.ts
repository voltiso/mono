// ⠀ⓥ 2022     🌩    🌩     ⠀   ⠀
// ⠀         🌩 V͛o͛͛͛lt͛͛͛i͛͛͛͛so͛͛͛.com⠀  ⠀⠀⠀

import type { DefaultUnknownSymbolOptions } from '@voltiso/schemar.types'
import { lazyConstructor } from '@voltiso/util'
import { defaultUnknownSymbolOptions } from '../defaultUnknownSymbolOptions'
import { CustomUnknownSymbolImpl } from './CustomUnknownSymbolImpl'

export class SymbolImpl extends lazyConstructor(
	() => CustomUnknownSymbolImpl,
)<DefaultUnknownSymbolOptions> {
	constructor() {
		super(defaultUnknownSymbolOptions as never)
	}
}
